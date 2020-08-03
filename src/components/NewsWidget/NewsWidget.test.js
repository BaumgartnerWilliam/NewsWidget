import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import NewsWidget from './NewsWidget';
import { createArticle, createFilterOptions } from '../../mocks';

describe('NewsWidget component', () => {
  const NewsWidgetSelector = 'news-widget';
  const NewsFilterSelector = 'news-filter';
  const NewsArticlesSelector = 'news-articles';
  const ShowMoreSelector = 'load-more-news';

  it('render without crashing', () => {
    const { container } = render(<NewsWidget />);

    expect(container).toBeInTheDocument();
  });

  it('renders a widget intitled news', () => {
    const { getByLabelText, getByText } = render(<NewsWidget />);

    getByLabelText(NewsWidgetSelector);
    getByText('News');
  });

  it('displays a news widget with filters and articles', () => {
    const { getByLabelText, getByText } = render(
      <NewsWidget
        filterOptions={createFilterOptions(5)}
        articles={createArticle(3)}
      />
    );

    getByLabelText(NewsArticlesSelector);
    getByLabelText(NewsFilterSelector);
  });

  it('should call the onFilterChange callback when the user changes it', async () => {
    const filters = createFilterOptions(5);
    const onFilterChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <NewsWidget
        filterOptions={filters}
        articles={createArticle(3)}
        onFilterChange={onFilterChange}
      />
    );
    expect(onFilterChange).not.toHaveBeenCalled();

    await wait(() => {
      fireEvent.change(getByLabelText(NewsFilterSelector), {
        target: { value: filters[4].value }
      });
    });

    expect(onFilterChange).toHaveBeenCalledWith(filters[4].value);
  });

  it('should call the onLoadMoreArticles callback when the user click the show more button', async () => {
    const onLoadMoreArticles = jest.fn();

    const { getByLabelText, getByText } = render(
      <NewsWidget
        filterOptions={createFilterOptions(4)}
        articles={createArticle(3)}
        onLoadMoreArticles={onLoadMoreArticles}
      />
    );

    expect(onLoadMoreArticles).not.toHaveBeenCalled();

    await wait(() => {
      fireEvent.click(getByLabelText(ShowMoreSelector));
    });

    expect(onLoadMoreArticles).toHaveBeenCalled();
  });
});
