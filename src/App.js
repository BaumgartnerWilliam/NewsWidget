import './App.css';

import React, { useContext, useEffect } from 'react';
import NewsWidget from './components/NewsWidget/NewsWidget';
import { NEWS_WIDGET } from './constants';
import { store } from './context/store';

function App() {
  const { state, dispatch } = useContext(store);
  const onFilterChange = filter =>
    dispatch({ type: NEWS_WIDGET.FILTER_ARTICLES, filter });
  const onLoadMoreArticles = () =>
    dispatch({ type: NEWS_WIDGET.LOAD_MORE_ARTICLES });

  useEffect(() => {
    dispatch({ type: NEWS_WIDGET.FETCH_ARTICLES_SUCCES });
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <NewsWidget
          filterOptions={state.articles?.filters}
          articles={state.articles?.data}
          onFilterChange={onFilterChange}
          onLoadMoreArticles={onLoadMoreArticles}
        />
      </header>
    </div>
  );
}

export default App;
