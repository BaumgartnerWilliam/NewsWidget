import React from 'react';
import { render } from '@testing-library/react';
import Article from './Article';

describe('Article component', () => {
  it('should render without crashing', () => {
    const props = {
      title: 'my title',
      date: new Date(),
      editor: 'editor name'
    };
    const { container } = render(<Article {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('should render the title, the date and the editor properly', () => {
    const props = {
      title: 'my title',
      date: new Date(),
      editor: 'editor name'
    };
    const { getByLabelText } = render(<Article {...props} />);

    expect(getByLabelText('title').textContent).toBe('my title');
    expect(getByLabelText('date').textContent).toBe(
      props.date.toLocaleDateString()
    );
    expect(getByLabelText('editor').textContent).toBe('editor name');
  });
});
