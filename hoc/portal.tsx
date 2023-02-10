import { createPortal } from 'react-dom';
import React, { FC, RefObject, useEffect, useState } from 'react';

type PortalComponentProps = {
  message: string;
  ref: RefObject<HTMLDivElement>;
  otherProps?: any;
};

const Portal =
  (PortalComponent: FC<PortalComponentProps>) =>
  ({ message, otherProps, ref }: PortalComponentProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      const unmountingTime = setTimeout(() => {
        setMounted(false);
      }, 5000);
      setMounted(true);

      return () => {
        setMounted(false);
        clearTimeout(unmountingTime);
      };
    }, []);
    return mounted
      ? createPortal(
          <PortalComponent message={message} {...otherProps} ref={ref} />,
          document.querySelector('#portal_root') as HTMLElement
        )
      : null;
  };

export default Portal;
