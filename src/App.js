import React, { useState } from 'react';
import Article from './components/Article/Article';
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
    .map((_, idx) => (
      <div key={idx}>
        <li className="article-list--item mt-2">
          <Article
            title={'something happened'}
            date={new Date()}
            editor={'my name'}
          />
        </li>
        <hr />
      </div>
    ));

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
            <ul aria-label="article-list" className="article-list">
              {createArticle(articles)}
            </ul>
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
