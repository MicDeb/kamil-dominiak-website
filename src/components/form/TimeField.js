import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { TimePicker } from 'antd';

export default function TimeField({ name, placeholder, ...inputProps }) {
  return (
    <Field
      name={name}
      component={(props) => (
        <TimePicker
          size='large'
          className='time-picker'
          placeholder={placeholder}
          {...props}
          {...inputProps}
        />
      )}
    />
  );
}

TimeField.defaultProps = {
  placeholder: 'Wybierz godzinę wydarzenia',
};

TimeField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
