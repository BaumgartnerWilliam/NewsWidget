import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  const filterSelector = 'news-filter';
  const articleSelector = 'article';
  const articleListSelector = 'article-list';
  const showMoreSelector = 'load-more-news';

  it('renders withough crashing', () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });

  it('renders the news widget', () => {
    const { getByLabelText } = render(<App />);

    getByLabelText('news-widget');
  });

  it('loads 5 unfiltered articles', () => {
    const { getByLabelText, getAllByLabelText } = render(<App />);

    getByLabelText(articleListSelector);
    expect(getByLabelText(filterSelector).value).toBe('');
    expect(getAllByLabelText(articleSelector).length).toBe(5);
  });

  it('loads 5 additional articles upon cliking on show more', async () => {
    const { getByLabelText, getAllByLabelText } = render(<App />);

    expect(getAllByLabelText(articleSelector).length).toBe(5);

    await wait(() => {
      fireEvent.click(getByLabelText(showMoreSelector));
    });
    expect(getAllByLabelText(articleSelector).length).toBe(10);
  });

  it('filters the articles upon changing it', async () => {
    const filterName = 'value-1';
    const unfilterName = '';
    const { getByLabelText, getAllByLabelText } = render(<App />);

    expect(getAllByLabelText(articleSelector).length).toBe(5);

    await wait(() => {
      fireEvent.change(getByLabelText(filterSelector), {
        target: { value: filterName }
      });
    });

    expect(getByLabelText(filterSelector).value).toBe(filterName);
    expect(getAllByLabelText(articleSelector).length).toBe(2);

    await wait(() => {
      fireEvent.change(getByLabelText(filterSelector), {
        target: { value: unfilterName }
      });
    });

    expect(getByLabelText(filterSelector).value).toBe(unfilterName);
    expect(getAllByLabelText(articleSelector).length).toBe(5);
  });
5});
