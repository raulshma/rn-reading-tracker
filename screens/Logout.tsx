import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

export default function Logout() {
  const { signout } = useContext(AuthContext);
  React.useEffect(() => {
    signout();
  }, []);
  return null;
}
