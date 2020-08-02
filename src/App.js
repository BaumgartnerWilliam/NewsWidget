import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <section className="widget">
          <div className="widget--title capitalize">
            <h3>news</h3>
            <div>
              <select>
                <option value="" selected>
                  select me
                </option>
                <option>test</option>
              </select>
            </div>
          </div>
          <ul className="widget--content">
            <li className="widget--item mt-2">
              <h3 className="capitalize medium-text">something happened yesterday with a great opportunity</h3>
              <p className="mt-1">
                <span className="small-text pr-2">29/08/2017</span>
                <span className="bubble-text small-text">hacker news</span>
              </p>
            </li>
            <hr />
            <li className="widget--item mt-2">
              <h3 className="capitalize medium-text">something happened yesterday</h3>
              <p className="mt-1">
                <span className="small-text pr-2">29/08/2017</span>
                <span className="bubble-text small-text">hacker news</span>
              </p>
            </li>
            <hr />
          </ul>
          <div className="widget--action mt-2">
            <button className="btn capitalize p-1">show more</button>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
