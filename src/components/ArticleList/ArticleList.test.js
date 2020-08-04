import React from 'react';
import { render } from '@testing-library/react';
import ArticleList from './ArticleList';
import { createArticle } from '../../mocks';

describe('ArticleList component', () => {
  const articleListSelector = 'article-list';
  const articleListItemSelector = 'article-list-item';
  const articleSelector = 'article';

  it('should render without crashing', () => {
    const { container } = render(<ArticleList />);

    expect(container).toBeInTheDocument();
  });

  it('should render a list of 5 articles withLinks', () => {
    const articles = createArticle(5);
    const { getAllByLabelText } = render(<ArticleList articles={articles} />);

    const articlesItems = getAllByLabelText(articleListItemSelector);
    expect(articlesItems.length).toBe(5);
    articlesItems.forEach((article, idx) => {
      expect(article.querySelector('a').href).toBe(articles[idx].url);
    });
  });

  it('should print the name of the source if the id is not present', () => {
    const articles = createArticle(5);
    const { getAllByLabelText } = render(<ArticleList articles={articles} />);

    expect(getAllByLabelText(articleListItemSelector).length).toBe(5);
    expect(
      getAllByLabelText(articleSelector)[1].querySelector(
        '[aria-label="editor"]'
      ).textContent
    ).toBe('id-1');

    expect(
      getAllByLabelText(articleSelector)[2].querySelector(
        '[aria-label="editor"]'
      ).textContent
    ).toBe('name-2');
  });
});
