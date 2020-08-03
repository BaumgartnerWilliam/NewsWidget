import { createArticleFilter } from './article';
import { createArticle } from '../mocks';

describe('createArticleFilter', () => {
  it('should not fail when nothing is passed', () => {
    const filters = createArticleFilter();

    expect(filters).toEqual({});
  });

  it('should return 5 unique keys', () => {
    const articles = createArticle(5);
    const filters = createArticleFilter(articles);

    expect(Object.values(filters).length).toBe(5);
    expect(Object.values(filters)).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: 'name-0',
          text: 'name-0'
        })
      ])
    );
  });

  it('should return 3 unique keys', () => {
    const articles = createArticle(5);

    articles[0].source.id = 'key';
    articles[1].source.id = 'key';
    articles[2].source.id = 'key';

    const filters = createArticleFilter(articles);
    expect(Object.values(filters).length).toBe(3);
  });

  it('should append to the existing filtersMap', () => {
    const filtersMap = {
      key1: { value: 'key1', text: 'name1' },
      key2: { value: 'key2', text: 'name2' }
    };

    const articles = createArticle(5);
    const filters = createArticleFilter(articles, filtersMap);
    expect(Object.values(filters).length).toBe(7);
  });
});
