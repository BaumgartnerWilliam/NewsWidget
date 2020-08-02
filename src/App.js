import React from 'react';
import logo from './logo.svg';
import Article from './components/Article/Article';
import Select from './components/Select/Select';
import Widget from './components/Widget/Widget';
import './App.css';

const mockOptions = [
  { value: '', text: 'filter by something' },
  { value: 'select', text: 'my value' }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Widget>
          <Widget.Header title={'News'}>
            <Select options={mockOptions} defaultValue="" />
          </Widget.Header>
          <Widget.Body>
            <ul className="article-list">
              <li className="article-list--item mt-2">
                <Article
                  title={'something happened'}
                  date={new Date()}
                  editor={'my name'}
                />
              </li>
              <hr />
              <li className="article-list--item mt-2">
                <Article
                  title={'something happened'}
                  date={new Date()}
                  editor={'my name'}
                />
              </li>
              <hr />
            </ul>
          </Widget.Body>
          <Widget.Footer>
            <button className="btn capitalize p-1">show more</button>
          </Widget.Footer>
        </Widget>
      </header>
    </div>
  );
}

export default App;
