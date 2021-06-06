import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { DatePicker } from 'antd';
import 'moment/locale/pl';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/pl_PL';

export default function DateField({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <DatePicker
        {...props}
        {...field}
        locale={locale}
        size='large'
        defaultValue={field.value ? moment(field.value) : null}
        value={field.value ? moment(field.value) : null}
        className='date-picker'
        placeholder={placeholder}
        onChange={(date) => helpers.setValue(date)}
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
