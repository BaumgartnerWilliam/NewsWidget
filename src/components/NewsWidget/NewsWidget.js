import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget/Widget';
import Select from '../Select/Select';
import ArticleList from '../ArticleList/ArticleList';

const NewsWidget = ({
  filterOptions,
  articles,
  onLoadMoreArticles,
  onFilterChange
}) => (
  <Widget aria-label="news-widget">
    <Widget.Header title={'News'}>
      <Select
        aria-label="news-filter"
        options={filterOptions}
        defaultValue=""
        onChange={onFilterChange}
      />
    </Widget.Header>
    <Widget.Body aria-label="news-articles">
      <ArticleList articles={articles} />
    </Widget.Body>
    <Widget.Footer aria-label="news-footer">
      <button
        aria-label="load-more-news"
        onClick={onLoadMoreArticles}
        className="btn capitalize p-1">
        show more
      </button>
    </Widget.Footer>
  </Widget>
);

NewsWidget.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string
    })
  ),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
      source: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ),
  onLoadMoreArticles: PropTypes.func,
  onFilterChange: PropTypes.func
};

export default memo(NewsWidget);
