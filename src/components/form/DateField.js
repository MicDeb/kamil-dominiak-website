import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { DatePicker } from 'antd';

export default function DateField({ placeholder, name, ...props }) {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(field.value);

  useEffect(() => {
    helpers.setValue(value);
  }, [value]);

  useEffect(() => {
    setValue(field.value);
  }, [field.value]);
  
  return (
    <DatePicker
      size='large'
      className='date-picker'
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      {...props}
    />
  );
}

DateField.defaultProps = {
  placeholder: 'Wybierz datę wydarzenia',
};

DateField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
