import { NEWS_WIDGET } from '../constants';
import { createArticleFilter } from '../services';
import { createArticle, createFilterOptions } from '../mocks';

const {
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCES,
  LOAD_MORE_ARTICLES,
  FILTER_ARTICLES
} = NEWS_WIDGET;

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
        articles: filter
          ? allArticles.filter(
              ({ source: { id, name } }) =>
                (id && id === filter) || name === filter
            )
          : allArticles
      };
    }
    case LOAD_MORE_ARTICLES: {
      const { allArticles = [] } = state;
      return {
        ...state,
        allArticles: [...allArticles, ...createArticle(5)]
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
