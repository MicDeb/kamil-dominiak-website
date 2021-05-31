import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export function confirmModal({
  title = 'Do you want to delete these items?',
  content = '',
  onOk,
}) {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    onOk() {
      return onOk();
    },
    onCancel() {},
  });
}
