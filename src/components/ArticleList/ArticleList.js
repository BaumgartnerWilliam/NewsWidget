import './ArticleList.css';

import React from 'react';
import PropTypes from 'prop-types';

import Article from '../Article/Article';

const ArticleList = ({ articles = [] }) =>
  articles && articles.length ? (
    <ul aria-label="article-list" className="article-list">
      {articles.map(({ id, title, publishedAt, source }) => (
        <div key={id}>
          <li aria-label="article-list-item" className="article-list--item mt-2">
            <Article
              title={title}
              date={new Date(publishedAt)}
              editor={source.id || source.name}
            />
          </li>
          <hr />
        </div>
      ))}
    </ul>
  ) : null;

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
      source: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  )
};

export default ArticleList;
