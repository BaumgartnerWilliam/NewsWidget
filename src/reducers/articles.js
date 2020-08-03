import { NEWS_WIDGET } from '../constants';
import { createArticleFilter } from '../services';

const {
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCES,
  LOAD_MORE_ARTICLES,
  FILTER_ARTICLES
} = NEWS_WIDGET;

const filterByNameOrId = (articles, filter) =>
  filter
    ? articles.filter(
        ({ source: { id, name } }) => (id && id === filter) || name === filter
      )
    : articles;

const ArticleReducer = (state, { type, filter, data }) => {
  switch (type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        isLoading: true
      };
    case FILTER_ARTICLES: {
      const { allArticles = [] } = state;
      return {
        ...state,
        articles: filterByNameOrId(allArticles, filter),
        selectedFilter: filter
      };
    }
    case LOAD_MORE_ARTICLES: {
      let { allArticles = [], selectedFilter, filters } = state;
      allArticles = [...allArticles, ...data];

      return {
        ...state,
        allArticles,
        articles: filterByNameOrId(allArticles, selectedFilter),
        filters: createArticleFilter(allArticles, filters)
      };
    }
    case FETCH_ARTICLES_SUCCES: {
      const { filters } = state;
      return {
        ...state,
        isLoading: false,
        articles: data,
        allArticles: data,
        filters: createArticleFilter(data, filters)
      };
    }
    default:
      return state;
  }
};

export default ArticleReducer;
