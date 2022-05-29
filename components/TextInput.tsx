import React, { forwardRef } from 'react';
import styles from '../styles/TextInput.module.css';

export const TextInput: React.FC<React.ComponentPropsWithRef<'input'>> =
  forwardRef(function input(props, ref) {
    const { className, ...rest } = props;
    return (
      <input
        className={`${styles.input} ${className}`}
        type={'text'}
        ref={ref}
        {...rest}
      />
    );
  });
