import './Select.css';

import React from 'react';
import PropTypes from 'prop-types';

const onSelectChange = fn => ({ target: { value } }) => {
  typeof fn === 'function' && fn(value);
  return false;
};

const Select = ({ onChange, options = [], defaultValue, ...props }) =>
  options && options.length ? (
    <select
      aria-label="select"
      className="select-css"
      onChange={onSelectChange(onChange)}
      defaultValue={defaultValue}
      {...props}>
      {options.map(({ value, text }) => (
        <option aria-label="option" key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  ) : null;

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array
};

export default Select;
