import React from 'react';
import { render } from '@testing-library/react';
import Article from './Article';

describe('Article component', () => {
  const titleSelector = 'title';
  const dateSelector = 'date';
  const editorSelector = 'editor';
  const articleSelector = 'article';
  const urlSelector = 'title-link';

  it('should render without crashing', () => {
    const props = {
      title: 'my title',
      date: new Date(),
      editor: 'editor name'
    };
    const { container, getByLabelText } = render(<Article {...props} />);
    getByLabelText(articleSelector);
    expect(container).toBeInTheDocument();
  });

  it('should render the title, url, the date and the editor properly', () => {
    const props = {
      title: 'my title',
      date: new Date(),
      editor: 'editor name',
      url: 'http://domain/my-url'
    };
    const { getByLabelText } = render(<Article {...props} />);

    expect(getByLabelText(titleSelector).textContent).toBe('my title');
    expect(getByLabelText(dateSelector).textContent).toBe(
      props.date.toLocaleDateString()
    );
    expect(getByLabelText(editorSelector).textContent).toBe('editor name');
    expect(getByLabelText(urlSelector).href).toBe(props.url);
  });
});
