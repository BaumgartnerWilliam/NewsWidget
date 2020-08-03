const api_key = '34e2ebc5674443dea02a218f48db1475';

const NewsApiUrl = 'https://newsapi.org/v2/top-headlines';

export const fetchTopHeadLines = ({
  page = 1,
  country = 'us',
  pageSize = 5,
  ...params
} = {}) => {
  const url = buildUrl(NewsApiUrl, {
    apiKey: api_key,
    country,
    page,
    pageSize,
    ...params
  });

  return fetch(url).then(response => response.json());
};
