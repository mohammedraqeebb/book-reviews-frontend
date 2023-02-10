import { motion } from 'framer-motion';
import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  width: string;
  children: string | JSX.Element;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, width, ...otherProps }) => {
  return (
    <button
      style={{ width }}
      className={`${styles.button_container} ${
        otherProps.disabled ? styles.disabled : ''
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
