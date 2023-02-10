import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { signin } from '../../features/user/user-slice';
import useRequest from '../../hooks/use-request';
import { BACKEND_URL } from '../../pages/_app';
import Logo from '../../static/assets/icons/logo.icon';
import styles from './Header.module.scss';
type User = {
  id: string;
  name: string;
};

type UserRequestResponse = {
  user: User | null;
};

const Header = () => {
  const dispatch = useAppDispatch();
  const { doRequest, errors } = useRequest<UserRequestResponse>({
    url: `${BACKEND_URL}/auth/currentuser`,
    method: 'post',
    onSuccess: (data) => {
      dispatch(signin(data.user));
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      await doRequest();
    };
    fetchUser();
  }, []);
  return (
    <div className={styles.header_container}>
      <Logo />
    </div>
  );
};

export default Header;
