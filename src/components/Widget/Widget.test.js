import React from 'react';
import { render } from '@testing-library/react';
import Widget from './Widget';

describe('Widget component', () => {
  const WidgetSelector = 'widget';

  it('should render without crashing', () => {
    const { container } = render(<Widget />);

    expect(container).toBeInTheDocument();
  });

  it('should render its children properly', () => {
    const { getByTestId, getByLabelText } = render(
      <Widget>
        <span data-testid="test">value</span>
      </Widget>
    );

    getByLabelText(WidgetSelector);
    expect(getByTestId('test').textContent).toBe('value');
  });

  describe('Widget Header', () => {
    const WidgetHeaderSelector = 'widget-header';
    const testid = 'header-test-id';
    const title = 'my title';

    it('should render without crashing', () => {
      const { container } = render(<Widget.Header title={''} />);

      expect(container).toBeInTheDocument();
    });

    it('should render the title properly and its children', () => {
      const { getByTestId, getByLabelText } = render(
        <Widget.Header title={title}>
          <span data-testid={testid}></span>
        </Widget.Header>
      );

      expect(getByLabelText(WidgetHeaderSelector).textContent).toBe(title);
      getByTestId(testid);
    });
  });

  describe('Widget Body', () => {
    const WidgetBodySelector = 'widget-body';

    it('should render without crashing', () => {
      const { container } = render(<Widget.Body />);

      expect(container).toBeInTheDocument();
    });

    it('should render properly its children', () => {
      const testid = 'body-test-id';
      const { getByTestId, getByLabelText } = render(
        <Widget.Body>
          <span data-testid={testid}></span>
        </Widget.Body>
      );

      getByLabelText(WidgetBodySelector);
      getByTestId(testid);
    });
  });

  describe('Widget Footer', () => {
    const WidgetFooterSelector = 'widget-footer';

    it('should render without crashing', () => {
      const { container } = render(<Widget.Footer />);

      expect(container).toBeInTheDocument();
    });

    it('should render properly its children', () => {
      const testid = 'footer-test-id';
      const { getByTestId, getByLabelText } = render(
        <Widget.Footer>
          <span data-testid={testid}></span>
        </Widget.Footer>
      );

      getByLabelText(WidgetFooterSelector);
      getByTestId(testid);
    });
  });
});
