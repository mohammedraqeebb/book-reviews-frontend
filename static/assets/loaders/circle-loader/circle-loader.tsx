import React from 'react';
import styles from './CircleLoader.module.scss';

const CircleLoader = () => {
  return (
    <div className={styles.sk_chase}>
      <div className={styles.sk_chase_dot}></div>
      <div className={styles.sk_chase_dot}></div>
      <div className={styles.sk_chase_dot}></div>
      <div className={styles.sk_chase_dot}></div>
      <div className={styles.sk_chase_dot}></div>
      <div className={styles.sk_chase_dot}></div>
    </div>
  );
};

export default CircleLoader;
