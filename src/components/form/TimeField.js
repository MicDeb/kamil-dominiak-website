import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TimePicker } from 'antd';
import 'moment/locale/pl';
import locale from 'antd/es/date-picker/locale/pl_PL';

export default function TimeField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState(field.value);

  const handleChange = (time) => {
    setValue(time);
  };

  const setFieldValue = useCallback(() => {
    helpers.setValue(value);
  }, [helpers, value]);

  useEffect(() => {
    setFieldValue();
  }, [value]);

  return (
    <>
      <TimePicker
        locale={locale}
        size='large'
        className='time-picker'
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

TimeField.defaultProps = {
  placeholder: 'Wybierz godzinę wydarzenia',
};

TimeField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
