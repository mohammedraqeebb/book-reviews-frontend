import React, { FC } from 'react';

type SavedIconProps = {
  width?: string;
  height?: string;
  color?: string;
};

const SavedIcon: FC<SavedIconProps> = ({
  width = '19',
  height = '21',
  color = '#3BA9F6',
}) => {
  return (
    <span>
      <svg
        width={width}
        height={height}
        viewBox="0 0 19 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 18V1H18V9.5V18L9.5 8.2561L1 18Z"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </span>
  );
};

export default SavedIcon;
