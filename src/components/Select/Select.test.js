import React from 'react';
import Select from './Select';
import { render, fireEvent, wait } from '@testing-library/react';

const createOptions = n =>
  Array(n)
    .fill(0)
    .map((_, idx) => ({
      value: `value-${idx}`,
      text: `text-${idx}`
    }));

describe('select', () => {
  const SelectSelector = 'select';
  const OptionSelector = 'option';

  it('should not render if no options provided', () => {
    const { container } = render(<Select />);
    const select = container.querySelector(SelectSelector);

    expect(select).toBe(null);
  });

  it('should render withouth crashing', () => {
    const { container } = render(<Select options={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render all options and their text', () => {
    const options = createOptions(5);

    const { getByText, getAllByLabelText } = render(
      <Select options={options} />
    );

    expect(getByText('text-1').value).toBe('value-1');
    expect(getByText('text-2').value).toBe('value-2');
    expect(getAllByLabelText(OptionSelector).length).toBe(5);
  });

  it('should select the first option if no defaultValue provided', () => {
    const options = createOptions(5);

    const { getByLabelText } = render(<Select options={options} />);

    expect(getByLabelText(SelectSelector).value).toBe('value-0');
  });

  it('should render with the default option selected', () => {
    const options = createOptions(5);
    options.push({
      value: 'selected',
      text: 'test'
    });

    const { getByLabelText } = render(
      <Select options={options} defaultValue={'selected'} />
    );

    expect(getByLabelText(SelectSelector).value).toEqual('selected');
  });

  it('should invoke the onChange handler with the selected value', async () => {
    const options = createOptions(3);
    const onChange = jest.fn();
    const previousValue = 'value-2';
    const targetValue = 'value-0';

    const { getByLabelText } = render(
      <Select
        options={options}
        defaultValue={options[2].value}
        onChange={onChange}
      />
    );

    const select = getByLabelText(SelectSelector);

    expect(select.value).toBe(previousValue);
    expect(select.children.length).toBe(3);
    expect(onChange).not.toHaveBeenCalled();

    await wait(() => {
      fireEvent.change(select, { target: { value: targetValue } });
    });

    expect(onChange).toHaveBeenCalledWith(targetValue);
    expect(select.value).toBe(targetValue);
  });
});
