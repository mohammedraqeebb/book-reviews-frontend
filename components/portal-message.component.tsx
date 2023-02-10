import { AnimatePresence, motion } from 'framer-motion';
import { FC, RefObject } from 'react';
import Portal from '../hoc/portal';
type PortalComponentProps = {
  message: string;
  ref: RefObject<HTMLDivElement>;
};

const PortalMessageComponent: FC<PortalComponentProps> = ({ message, ref }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '-100', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{
          y: '-100',
          opacity: 0,
          transition: { duration: 0.2, ease: 'ease-in-out' },
        }}
        style={{
          width: '220px',
          height: 'auto',
          minHeight: '60px',
          border: '1px solid #000011',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 5,
          left: '50%',
          padding: '10',
          transform: 'translateX(-50%)',
          userSelect: 'none',
          background: 'white',
          fontSize: '10',
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
        ref={ref}
      >
        <p style={{ fontSize: '12px' }}>{message}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Portal(PortalMessageComponent);
