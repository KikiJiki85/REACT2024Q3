import React from 'react';
import { FallbackUiProps } from './types';
import styles from './FallbackUi.module.css';

const FallbackUi: React.FC<FallbackUiProps> = ({ message, onClose }) => {
  return (
    <div className={styles['fallback__overlay']}>
      <div className={styles['fallback__window']}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FallbackUi;
