// todo: perform a url validation with try catch blocks
export const buildUrl = (url, searchParams = {}) => {
  const targetUrl = new URL(url);

  Object.entries(searchParams).forEach(([entry, value]) => {
    if (value) {
      // if value is truthy we append
      targetUrl.searchParams.append(entry, value);
    }
  });

  return targetUrl.href;
};
