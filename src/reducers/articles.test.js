import { NEWS_WIDGET } from '../constants';
import ArticlesReducer from './articles';
import { createArticleFilter } from '../services';
import { createArticle } from '../mocks';

const {
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCES,
  LOAD_MORE_ARTICLES,
  FILTER_ARTICLES
} = NEWS_WIDGET;

describe('articles reducer', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it('should return a state with isLoading true', () => {
    const action = { type: FETCH_ARTICLES };
    const resultState = ArticlesReducer(state, action);

    expect(resultState.isLoading).toBe(true);
  });

  it('should return a state with 5 articles', () => {
    state = {
      isLoading: true
    };
    const action = { type: FETCH_ARTICLES_SUCCES, data: createArticle(5) };
    const resultState = ArticlesReducer(state, action);

    expect(resultState.articles.length).toBe(5);
    expect(resultState.allArticles.length).toBe(5);
    expect(resultState.isLoading).toBe(false);
  });

  it('should return a state with filterOptions', () => {
    const action = { type: FETCH_ARTICLES_SUCCES, data: createArticle(5) };
    const resultState = ArticlesReducer(state, action);
    const { filters } = resultState;

    expect(Object.values(filters).length).toBe(5);
  });

  it('should add 5 more articles to the state', () => {
    const action = { type: LOAD_MORE_ARTICLES, data: createArticle(5) };

    let resultState = ArticlesReducer(state, action);
    expect(resultState.allArticles.length).toBe(5);
    resultState = ArticlesReducer(resultState, action);
    expect(resultState.allArticles.length).toBe(10);
  });

  it('should apply filter after loading more articles', () => {
    const allArticles = createArticle(5);
    allArticles[1].source.id = 'byId';
    allArticles[3].source.id = 'byId';
    allArticles[0].source.name = 'byName';
    allArticles[2].source.name = 'byName';

    const action = { type: LOAD_MORE_ARTICLES, data: createArticle(5) };
    const filters = createArticleFilter(allArticles);
    const filterKeys = Object.keys(filters);
    const selectedFilter = filterKeys[0];
    state = {
      filters,
      allArticles,
      selectedFilter
    };

    let resultState = ArticlesReducer(state, action);
    expect(resultState.allArticles.length).toBe(10);
    expect(resultState.articles.length).toBe(2);

    resultState.selectedFilter = '';
    resultState = ArticlesReducer(resultState, action);
    expect(resultState.articles.length).toBe(15);
    expect(resultState.allArticles.length).toBe(15);
  });

  it('should filter and unfilter articles', () => {
    const articles = createArticle(5);
    articles[1].source.id = 'byId';
    articles[3].source.id = 'byId';
    articles[0].source.name = 'byName';
    articles[2].source.name = 'byName';

    const unfilterValue = '';
    const filters = createArticleFilter(articles);
    state = {
      allArticles: articles,
      filters,
      selectedFilter: unfilterValue
    };

    const filterKeys = Object.keys(filters);
    const unfilter = { type: FILTER_ARTICLES, filter: unfilterValue };
    const filterByNameValue = filterKeys[0];
    const filterByIdValue = filterKeys[1];
    const filterByName = {
      type: FILTER_ARTICLES,
      filter: filterByNameValue
    };
    const filterById = {
      type: FILTER_ARTICLES,
      filter: filterByIdValue
    };

    let resultState = ArticlesReducer(state, filterByName);
    expect(resultState.articles.length).toBe(2);
    expect(resultState.selectedFilter).toBe(filterByNameValue);

    resultState = ArticlesReducer(state, filterById);
    expect(resultState.articles.length).toBe(2);
    expect(resultState.selectedFilter).toBe(filterByIdValue);

    resultState = ArticlesReducer(state, unfilter);
    expect(resultState.articles.length).toBe(5);
    expect(resultState.selectedFilter).toBe(unfilterValue);
  });
});
