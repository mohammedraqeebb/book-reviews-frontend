import { useEffect, useState } from 'react';
import PortalMessageComponent from '../components/portal-message.component';

import usePortal from '../hooks/use-portal';

import styles from '../styles/Test.module.scss';

const Test = () => {
  return (
    <div>
      <div className={styles.box_1}></div>
      <div className={styles.box_2}></div>
    </div>
  );
};

export default Test;
