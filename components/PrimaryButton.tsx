import { ButtonHTMLAttributes } from 'react';
import styles from '../styles/PrimaryButton.module.css';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSecondary?: boolean;
};

export const PrimaryButton = ({
  className,
  isSecondary = false,
  ...rest
}: PrimaryButtonProps) => {
  const buttonStyle = !isSecondary ? styles.button : styles.secondary_button;
  return <button {...rest} className={`${buttonStyle} ${className}`}></button>;
};
