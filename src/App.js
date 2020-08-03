import './App.css';

import React, { useContext, useEffect, useCallback, useState } from 'react';
import NewsWidget from './components/NewsWidget/NewsWidget';
import { NEWS_WIDGET } from './constants';
import { fetchTopHeadLines } from './api';
import { store } from './context/store';

function App() {
  const { state, dispatch } = useContext(store);
  const onFilterChange = filter =>
    dispatch({ type: NEWS_WIDGET.FILTER_ARTICLES, filter });

  const [page, setPage] = useState(1);
  const onLoadMoreArticles = async () => {
    const nextPage = page + 1;
    // todo: handle error case
    const params = {
      // when querying with sources, country has to be unset
      country: state.selectedFilter ? '' : 'us',
      sources: state.selectedFilter || '',
    };
    const { articles } = await fetchTopHeadLines(params);

    setPage(nextPage);
    dispatch({ type: NEWS_WIDGET.LOAD_MORE_ARTICLES, data: articles });
  };

  const onPageLoad = useCallback(() => {
    // todo: handle error case
    fetchTopHeadLines().then(({ articles }) => {
      dispatch({
        type: NEWS_WIDGET.FETCH_ARTICLES_SUCCES,
        data: articles
      });
    });
  }, [dispatch]);

  useEffect(onPageLoad, [dispatch]);

  const filterOptions = Object.values(state.filters || {});
  const defaultFilter = {
    value: '',
    text: 'filter by something'
  };

  return (
    <div className="App">
      <header className="App-header">
        <NewsWidget
          filterOptions={[defaultFilter, ...filterOptions]}
          articles={state.articles}
          onFilterChange={onFilterChange}
          onLoadMoreArticles={onLoadMoreArticles}
        />
      </header>
    </div>
  );
}

export default App;
