import { buildUrl } from './buildUrl';

describe('buildUrl', () => {
  const url = 'http://localhost/';
  let searchParams;

  it('should return the base url', () => {
    expect(buildUrl(url, searchParams)).toBe(url);
  });

  it('should append searchParams', () => {
    searchParams = {
      key1: 'value1',
      key2: 'value2'
    };

    expect(buildUrl(url, searchParams)).toBe(
      `http://localhost/?key1=value1&key2=value2`
    );
  });
});
