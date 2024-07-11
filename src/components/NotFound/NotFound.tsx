import React from 'react';
import styles from './NotFound.module.css';
const NotFound: React.FC = () => {
  return <h2 className={styles['not-found']}>404 - Page Not Found</h2>;
};

export default NotFound;
