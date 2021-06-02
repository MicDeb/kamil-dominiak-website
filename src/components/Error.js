import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

export default function Error({
  msg,
}) {
  const {
    Title,
  } = Typography;

  return (
    <div>
      <Title
        level={3}
        className='text-center text-danger'
      >
        {msg}
      </Title>
    </div>
  );
}

Error.defaultProps = {
  msg: 'Wystąpił błąd. Odśwież przeglądarkę lub spróbuj później.',
};

Error.propTypes = {
  msg: PropTypes.string,
};
