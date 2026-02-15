import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

type Variant = 'default' | 'primary' | 'danger' | 'ghost' | 'active' | 'icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = ({ variant = 'default', className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        styles.button,
        variant !== 'default' && styles[variant],
        className
      )}
      {...props}
    />
  );
};

export default Button;