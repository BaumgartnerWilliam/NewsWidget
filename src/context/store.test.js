import React, { useContext } from 'react';
import { render } from '@testing-library/react';

import { StateProvider, store } from './store';

const TestComponent = () => {
  const { state, dispatch } = useContext(store);
  dispatch('test');

  return <span>{state.value}</span>;
};

describe('store and stateProvider', () => {
  it('should render properly', () => {
    const { container } = render(
      <StateProvider>
        <TestComponent />
      </StateProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
