import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { store, StateProvider } from './context/store';
import { createArticleFilter } from './services';
import { createArticle } from './mocks';
import App from './App';

const renderApp = (state, dispatch) => (
  <store.Provider value={{ state, dispatch }}>
    <App />
  </store.Provider>
);

describe('App component', () => {
  const filterSelector = 'news-filter';
  const articleSelector = 'article';
  const articleListSelector = 'article-list';
  const showMoreSelector = 'load-more-news';

  let state;
  let dispatch;

  beforeEach(() => {
    const articles = createArticle(5);
    const filters = createArticleFilter(articles);

    dispatch = jest.fn();
    state = {
      articles,
      filters
    };
    jest.clearAllMocks();
  });

  it('renders withough crashing', () => {
    const { container } = render(renderApp(state, dispatch));

    expect(container).toBeInTheDocument();
  });

  it('renders the news widget', () => {
    const { getByLabelText } = render(renderApp(state, dispatch));

    getByLabelText('news-widget');
  });

  it('loads 5 unfiltered articles', () => {
    const { getByLabelText, getAllByLabelText } = render(
      renderApp(state, dispatch)
    );

    getByLabelText(articleListSelector);
    expect(getByLabelText(filterSelector).value).toBe('');
    expect(getAllByLabelText(articleSelector).length).toBe(5);
  });

  it('loads 5 additional articles upon cliking on show more', async () => {
    const { getByLabelText, getAllByLabelText, rerender } = render(
      renderApp(state, dispatch)
    );

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'NEWS-WIDGET_FETCH_SUCCESS'
    }));
    expect(getAllByLabelText(articleSelector).length).toBe(5);

    await wait(() => {
      fireEvent.click(getByLabelText(showMoreSelector));
    });

    expect(dispatch).toHaveBeenCalledWith({ type: 'NEWS-WIDGET_LOAD_MORE' });
  });

  it('filters the articles upon changing it', async () => {
    const filterKeys = Object.keys(state.filters);
    const filterName = state.filters[filterKeys[0]].value
    const unfilterName = '';
    const { getByLabelText, getAllByLabelText } = render(
      renderApp(state, dispatch)
    );

    expect(getAllByLabelText(articleSelector).length).toBe(5);

    await wait(() => {
      fireEvent.change(getByLabelText(filterSelector), {
        target: { value: filterName }
      });
    });

    expect(getByLabelText(filterSelector).value).toBe(filterName);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'NEWS-WIDGET_FILTER_ARTICLES',
      filter: filterName
    });

    await wait(() => {
      fireEvent.change(getByLabelText(filterSelector), {
        target: { value: unfilterName }
      });
    });

    expect(getByLabelText(filterSelector).value).toBe(unfilterName);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'NEWS-WIDGET_FILTER_ARTICLES',
      filter: unfilterName
    });
  });
});
