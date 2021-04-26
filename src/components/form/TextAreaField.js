import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Input } from 'antd';

export default function TextAreaField({ placeholder, ...props }) {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(field.value);

  useEffect(() => {
    helpers.setValue(value);
  }, [value]);

  useEffect(() => {
    setValue(field.value);
  }, [field.value]);
  const { TextArea } = Input;
  return (
    <TextArea
      rows={4}
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      {...props}
    />
  );
}

TextAreaField.defaultProps = {
  placeholder: 'Wpisz tekst',
};

TextAreaField.propTypes = {
  placeholder: PropTypes.string,
};
