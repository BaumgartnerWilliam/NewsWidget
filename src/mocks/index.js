export const createArticle = n =>
  Array(n)
    .fill(0)
    .map((_, idx) => ({
      id: String(idx),
      title: `my super title ${idx}`,
      source: {
        id: idx % 2 === 0 ? null : `id-${idx}`,
        name: `name-${idx}`
      },
      publishedAt: '2020-01-01T08:00:00Z'
    }));

export const createFilterOptions = n =>
  Array(n)
    .fill(0)
    .map((_, idx) => ({
      value: `value-${idx}`,
      text: `text-${idx}`
    }));
