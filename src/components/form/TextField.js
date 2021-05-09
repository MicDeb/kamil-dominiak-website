import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

export default function TextField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(field.value);

  const handleChange = ({ target }) => setValue(target.value);

  const setFieldValue = () => helpers.setValue(value);

  const debouncedFieldValue = debounce(setFieldValue, 500, { maxWait: 1000 });

  useEffect(() => {
    debouncedFieldValue();
  }, [value]);

  return (
    <>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
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
