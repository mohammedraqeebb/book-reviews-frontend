import axios from 'axios';
import { useState } from 'react';
import * as React from 'react';
import { useAppSelector } from '../app/hooks';
import { useRouter } from 'next/router';
type Method = 'get' | 'post' | 'put' | 'delete';

type useRequestParameters = {
  url: string;
  method: Method;
  body?: any;
  onSuccess: (data: any) => void;
  authenticated?: boolean;
};
type ErrorFormat = {
  message: string;
  field?: string;
};

const useRequest = <T>({
  url,
  method,
  body,
  onSuccess,
  authenticated = false,
}: useRequestParameters) => {
  const [errors, setErrors] = useState<null | ErrorFormat[]>(null);
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const doRequest = async () => {
    let cancel;
    if (authenticated && !user) {
      router.push('/auth/signin');
      return;
    }

    try {
      const { data } = await axios[method]<T>(
        url,
        {
          ...body,
        },
        { withCredentials: true }
      );

      onSuccess(data);

      return data;
    } catch (axiosError) {
      if (axios.isCancel(axiosError)) {
        return;
      }

      if (axios.isAxiosError(axiosError)) {
        //@ts-ignore
        setErrors(axiosError.response?.data.errors as ErrorFormat[]);
      }
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };
  return { errors, doRequest };
};

export default useRequest;
