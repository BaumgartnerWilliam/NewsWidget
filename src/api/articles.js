const api_key = '34e2ebc5674443dea02a218f48db1475';

export const fetchTopHeadLines = ({ page = 1, pageSize = 5 } = {}) =>
  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}&page=${page}&pageSize=${pageSize}`
  ).then(response => response.json());
