import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Input } from 'antd';

export default function TextAreaField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);

  const { TextArea } = Input;
  return (
    <>
      <TextArea
        rows={4}
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

TextAreaField.defaultProps = {
  placeholder: 'Wpisz tekst',
};

TextAreaField.propTypes = {
  placeholder: PropTypes.string,
};
