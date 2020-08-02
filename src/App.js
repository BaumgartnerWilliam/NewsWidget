import React, { useState } from 'react';
import NewsWidget from './components/NewsWidget/NewsWidget';
import { createArticle, createFilterOptions } from './mocks';
import './App.css';

function App() {
  const [articles, setNumberOfArticles] = useState(5);
  const filters = createFilterOptions(3);
  filters.push({
    value: '',
    text: 'filter by something'
  });

  const addArticles = () => setNumberOfArticles(articles + 5);
  const filterArticles = value =>
    value ? setNumberOfArticles(2) : setNumberOfArticles(5);

  return (
    <div className="App">
      <header className="App-header">
        <NewsWidget
          filterOptions={filters}
          articles={createArticle(articles)}
          onFilterChange={filterArticles}
          onLoadMoreArticles={addArticles}
        />
      </header>
    </div>
  );
}

export default App;
