import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'accent' | 'outlined' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    className?: string;
    component?: any;
    to?: string;
}

const Button: React.FC<ButtonProps> = ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className,
    ...props 
}) => {
    const variants = {
        primary: "bg-primary-accent text-background hover:bg-primary-accent/90 shadow-lg shadow-primary-accent/20",
        accent: "bg-secondary-accent text-background hover:bg-secondary-accent/90 shadow-lg shadow-secondary-accent/20",
        outlined: "bg-transparent border-2 border-primary-accent text-primary-accent hover:bg-primary-accent/10",
        ghost: "bg-transparent text-text-muted hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg font-bold",
    };

    return (
        <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                sizes[size],
                className
            )}
            {...(props as any)}
        >
            {children}
        </motion.button>
    );
};

export default Button;
