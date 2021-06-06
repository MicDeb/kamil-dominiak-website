import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TimePicker } from 'antd';
import 'moment/locale/pl';
import locale from 'antd/es/date-picker/locale/pl_PL';
import moment from 'moment';

const format = 'HH:mm';

export default function TimeField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <TimePicker
        locale={locale}
        size='large'
        className='time-picker'
        placeholder={placeholder}
        format={format}
        {...props}
        {...field}
        defaultValue={field.value ? moment(field.value, format) : null}
        value={field.value ? moment(field.value, format) : null}
        onChange={(date) => helpers.setValue(date)}
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
