import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';

export const Modal = ({
  children,
  isModalVisible,
  handleOk,
  handleCancel,
}) => (
  <>
    <AntdModal
      title='Basic Modal'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </AntdModal>
  </>
);

Modal.defaultProps = {
  isModalVisible: false,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool,
};
