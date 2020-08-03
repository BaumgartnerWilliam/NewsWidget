/**
 * @param Articles[] - list of articles
 * @param filtersMap - map of filters to be appended
 * @return FilterOptions
 */
export const createArticleFilter = (articles = [], filtersMap = {}) => {
  const filters = filtersMap || {};

  for (let i = 0; i < articles.length; i++) {
    const {
      source: { id, name }
    } = articles[i];

    const key = id || name;
    if (!filters[key]) {
      filters[key] = {
        value: key,
        name
      };
    }
  }

  return filters;
};
