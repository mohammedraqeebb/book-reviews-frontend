import { Skeleton } from '@mui/material';
import React from 'react';
import useWindowWidth from '../hooks/use-window-width';

const PageSkeleton = () => {
  let width = useWindowWidth();

  width = width > 1000 ? 900 : width * 0.85;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
      }}
    >
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
      <Skeleton animation="wave" height={30} width={width} />
    </div>
  );
};

export default PageSkeleton;
