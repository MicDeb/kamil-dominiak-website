import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Input } from 'antd';

export default function TextField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <Input
        placeholder={placeholder}
        {...props}
        {...field}
        onChange={(event) => helpers.setValue(event.target.value)}
      />
      {meta.error && meta.touched && (
        <div className='field__error'>{meta.error}</div>
      )}
    </>
  );
}

TextField.defaultProps = {
  placeholder: 'Wpisz tekst',
};

TextField.propTypes = {
  placeholder: PropTypes.string,
};
