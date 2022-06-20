import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ testId, id, type, onChange, labelText, value }) => (
  <label htmlFor={ id }>
    { labelText }
    <input
      data-testid={ testId }
      id={ id }
      type={ type }
      onChange={ ({ target }) => onChange(target.value) }
      value={ value }
    />
  </label>
);

Input.propTypes = {
  testId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
