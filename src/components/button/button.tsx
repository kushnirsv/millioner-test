import React from 'react';
import styles from './button.module.scss';

interface iButton extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  type: 'submit' | 'reset' | 'button';
  onClick: () => void;
}

function Button({ type = 'button', onClick, label }: iButton) {
  return (
    <button className={styles.root} type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
