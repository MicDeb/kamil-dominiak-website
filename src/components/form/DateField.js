import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { DatePicker } from 'antd';
import 'moment/locale/pl';
import locale from 'antd/es/date-picker/locale/pl_PL';

export default function DateField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(field.value);

  const handleChange = (momentDate) => setValue(momentDate);

  const setFieldValue = useCallback(() => {
    helpers.setValue(value);
  }, [helpers, value]);

  useEffect(() => {
    setFieldValue();
  }, [value]);

  return (
    <>
      <DatePicker
        locale={locale}
        size='large'
        className='date-picker'
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

DateField.defaultProps = {
  placeholder: 'Wybierz datę wydarzenia',
};

DateField.propTypes = {
  placeholder: PropTypes.string,
};
