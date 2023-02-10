import React, { FC } from 'react';

type SavedActiveIconProps = {
  width?: string;
  height?: string;
  color?: string;
};
const SavedActiveIcon: FC<SavedActiveIconProps> = ({
  width = '20',
  height = '22',
  color = '#04395E',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="25" height="25" transform="translate(1 1)" fill="white" />
      <path
        d="M1 26V1H26V13.5V26L13.5 11.6707L1 26Z"
        fill={color}
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};

export default SavedActiveIcon;
