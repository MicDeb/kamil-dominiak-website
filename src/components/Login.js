import React, { useContext } from 'react';
import { Button } from 'antd';
import netlifyIdentity from 'netlify-identity-widget';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { UserContext } from '../helpers/userContext';

export default function Login() {
  const user = useContext(UserContext);
  return (
    user ? (
      <Button
        type='primary'
        icon={<LogoutOutlined />}
        onClick={() => netlifyIdentity.logout()}
      >
        Wyloguj się
      </Button>
    ) : (
      <Button
        type='primary'
        icon={<LoginOutlined />}
        onClick={() => netlifyIdentity.open('login')}
      >
        Zaloguj się
      </Button>
    )
  );
}
