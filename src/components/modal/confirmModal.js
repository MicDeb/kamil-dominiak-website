import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export function confirmModal({
  title = 'Do you want to delete these items?',
  content = 'When clicked the OK button, this dialog will be closed after 1 second',
}) {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // eslint-disable-next-line no-console
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}
