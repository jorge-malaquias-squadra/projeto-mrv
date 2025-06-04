import React from 'react';
import css from './style.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, variant = '', ...props }) => {
  return (
    <button {...props} className={`${css['button']} ${css[variant]} py-2 px-8 text-lg font-bold`}>
      {children}
    </button>
  );
};

export default Button;