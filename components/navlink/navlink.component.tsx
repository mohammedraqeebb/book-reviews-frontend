import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
interface NavLinkProps {
  to: string;
  name: string;
  currentPath: string;
  activeComponent: JSX.Element;
  inactiveComponent: JSX.Element;
}

const NavLink = ({
  to,
  name,
  currentPath,
  activeComponent,
  inactiveComponent,
}: NavLinkProps) => {
  const myPath = to.slice(1);
  const isActive = currentPath === myPath;

  return (
    <Link
      style={{
        fontWeight: isActive ? 700 : 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        height: '40px',
        width: '40px',
      }}
      href={to}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div whileTap={{ scale: 0.6 }}>{activeComponent}</motion.div>
        )}
        {!isActive && (
          <motion.div whileTap={{ scale: 0.6 }}>{inactiveComponent}</motion.div>
        )}
      </AnimatePresence>
      {name}
    </Link>
  );
};

export default NavLink;
