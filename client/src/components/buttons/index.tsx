import { ReactElement } from 'react';
import './button.scss';
const Button = ({
  children,
  variant = 'primary',
  onClick,
  prefixIcon,
  className,
}: {
  children: ReactElement | string;
  variant?: 'primary' | 'error' | 'success';
  onClick?: () => void;
  prefixIcon?: ReactElement;
  className?: string;
}) => {
  return (
    <div className={`custom-button`}>
      <button className={`${variant} ${className}`} onClick={onClick}>
        {prefixIcon && prefixIcon} {children}
      </button>
    </div>
  );
};

export default Button;
