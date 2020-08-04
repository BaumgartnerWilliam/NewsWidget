import './Article.css';

import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ title, date, editor, url }) => (
  <article aria-label="article" className="article">
    <h3 aria-label="title" className="title capitalize medium-text">
      <a
        className="title-link"
        aria-label="title-link"
        href={url}
        target="_blank"
        rel="noreferrer noopener">
        {title}
      </a>
    </h3>
    <p className="mt-1">
      <span aria-label="date" className="small-text pr-2">
        {new Date(date).toLocaleDateString()}
      </span>
      <span aria-label="editor" className="bubble-text small-text">
        {editor}
      </span>
    </p>
  </article>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  editor: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Article;
