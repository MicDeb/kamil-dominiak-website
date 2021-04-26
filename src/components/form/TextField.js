import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Input } from 'antd';

export default function TextField({ placeholder, ...props }) {
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
    <Input
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      {...props}
    />
  );
}

TextField.defaultProps = {
  placeholder: 'Wpisz tekst',
};

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
};
