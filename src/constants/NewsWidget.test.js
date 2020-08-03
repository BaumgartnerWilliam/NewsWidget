import {
  FETCH_ARTICLES,
  FILTER_ARTICLES,
  LOAD_MORE_ARTICLES,
  FETCH_ARTICLES_SUCCES
} from './NewsWidget';

describe('NewsWidget constants', () => {
  it('matches constansts strings', () => {
    expect(FETCH_ARTICLES).toEqual('NEWS-WIDGET_FETCH_ARTICLES');
    expect(FILTER_ARTICLES).toEqual('NEWS-WIDGET_FILTER_ARTICLES');
    expect(LOAD_MORE_ARTICLES).toEqual('NEWS-WIDGET_LOAD_MORE');
    expect(FETCH_ARTICLES_SUCCES).toEqual('NEWS-WIDGET_FETCH_SUCCESS');
  });
});
