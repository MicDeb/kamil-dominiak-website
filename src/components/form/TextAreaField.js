import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

export default function TextAreaField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(field.value);

  const handleChange = ({ target }) => setValue(target.value);

  const setFieldValue = () => helpers.setValue(value);

  const debouncedFieldValue = debounce(setFieldValue, 500, { maxWait: 1000 });

  useEffect(() => {
    debouncedFieldValue();
  }, [value]);

  const { TextArea } = Input;
  return (
    <>
      <TextArea
        rows={4}
        placeholder={placeholder}
        onChange={handleChange}
        {...props}
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
