import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';

export const Modal = ({
  children,
  isModalVisible,
  handleOk,
  handleCancel,
  ...props
}) => (
  <>
    <AntdModal
      title='Basic Modal'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      {...props}
    >
      {children}
    </AntdModal>
  </>
);

Modal.defaultProps = {
  isModalVisible: false,
  handleOk: () => null,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOk: PropTypes.func,
  isModalVisible: PropTypes.bool,
};
