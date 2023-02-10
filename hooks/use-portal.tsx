import React, {
  useEffect,
  createRef,
  useState,
  useRef,
  ReactNode,
} from 'react';
import PortalMessageComponent from '../components/portal-message.component';
type UsePortalProps = {
  message: string;
};

const usePortal = ({ message }: UsePortalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const portal = <PortalMessageComponent message={message} ref={ref} />;
  }, []);
};

export default usePortal;
