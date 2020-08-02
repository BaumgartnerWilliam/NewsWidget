import React, { useState } from 'react';
import ArticleList from './components/ArticleList/ArticleList';
import Select from './components/Select/Select';
import Widget from './components/Widget/Widget';
import './App.css';

const mockOptions = [
  { value: '', text: 'filter by something' },
  { value: 'select', text: 'my value' }
];

const createArticle = n =>
  Array(n)
    .fill(0)
    .map((_, idx) => ({
      id: String(idx),
      title: `my super title ${idx}`,
      source: {
        id: idx % 2 === 0 ? null : `id-${idx}`,
        name: `name-${idx}`
      },
      publishedAt: '2020-01-01T08:00:00Z'
    }));

function App() {
  const [articles, setNumberOfArticles] = useState(5);

  const addArticles = () => setNumberOfArticles(articles + 5);
  const filterArticles = value =>
    value ? setNumberOfArticles(2) : setNumberOfArticles(5);

  return (
    <div className="App">
      <header className="App-header">
        <Widget>
          <Widget.Header title={'News'}>
            <Select
              options={mockOptions}
              defaultValue=""
              onChange={filterArticles}
            />
          </Widget.Header>
          <Widget.Body>
            <ArticleList articles={createArticle(articles)}/>
          </Widget.Body>
          <Widget.Footer>
            <button
              aria-label="show-more"
              onClick={addArticles}
              className="btn capitalize p-1">
              show more
            </button>
          </Widget.Footer>
        </Widget>
      </header>
    </div>
  );
}

export default App;
