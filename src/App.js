import './App.css';

import React, { useContext, useEffect } from 'react';
import NewsWidget from './components/NewsWidget/NewsWidget';
import { NEWS_WIDGET } from './constants';
import { createArticle } from './mocks';
import { store } from './context/store';

function App() {
  const { state, dispatch } = useContext(store);
  const onFilterChange = filter =>
    dispatch({ type: NEWS_WIDGET.FILTER_ARTICLES, filter });
  const onLoadMoreArticles = () =>
    dispatch({ type: NEWS_WIDGET.LOAD_MORE_ARTICLES });

  useEffect(() => {
    dispatch({
      type: NEWS_WIDGET.FETCH_ARTICLES_SUCCES,
      data: createArticle(5)
    });
  }, [dispatch]);

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
