import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { store } from './context/store';
import { createArticle, createFilterOptions } from './mocks';
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
  const filters = createFilterOptions(3);
  filters.push({
    value: '',
    text: 'filter by something'
  });

  beforeEach(() => {
    dispatch = jest.fn();
    state = {
      articles: {
        data: createArticle(5),
        filters
      }
    };
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

    expect(dispatch).toHaveBeenCalledWith({ type: 'fetch_articles_success' });
    expect(getAllByLabelText(articleSelector).length).toBe(5);

    await wait(() => {
      fireEvent.click(getByLabelText(showMoreSelector));
    });

    expect(dispatch).toHaveBeenCalledWith({ type: 'load_more_articles' });
  });

  it('filters the articles upon changing it', async () => {
    const filterName = 'value-1';
    const unfilterName = '';
    const { getByLabelText, getAllByLabelText, rerender } = render(
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
      type: 'filter_articles',
      filter: filterName
    });

    await wait(() => {
      fireEvent.change(getByLabelText(filterSelector), {
        target: { value: unfilterName }
      });
    });

    expect(getByLabelText(filterSelector).value).toBe(unfilterName);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'filter_articles',
      filter: filterName
    });
  });
5});
