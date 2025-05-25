// components/ui/Button.tsx
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseClasses = 'px-6 py-3 rounded-md font-medium transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow hover:shadow-md',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;