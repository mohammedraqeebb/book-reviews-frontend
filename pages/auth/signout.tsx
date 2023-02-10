import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/button/button.component';
import { signout } from '../../features/user/user-slice';
import useRequest from '../../hooks/use-request';
import { BACKEND_URL } from '../_app';

const SignOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { doRequest, errors } = useRequest<null>({
    url: `${BACKEND_URL}/auth/signout`,
    method: 'post',
    onSuccess: () => {
      dispatch(signout());
    },
  });
  const handleSignout = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await doRequest();
  };
  return (
    <div>
      <Button onClick={handleSignout} width="100px">
        signout
      </Button>
    </div>
  );
};

export default SignOut;
