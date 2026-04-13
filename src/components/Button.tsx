import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
    variant?: 'primary' | 'accent' | 'outlined' | 'text';
    children: React.ReactNode;
    component?: any;
    to?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, sx = {}, ...props }) => {
    const getStyles = () => {
        switch (variant) {
            case 'accent':
                return {
                    bgcolor: 'accent.main',
                    color: '#fff',
                    '&:hover': {
                        bgcolor: '#e65c2b',
                        transform: 'translateY(-2px)'
                    }
                };
            case 'outlined':
                return {
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'rgba(46, 139, 87, 0.05)',
                        transform: 'translateY(-2px)'
                    }
                };
            case 'text':
                return {
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    '&:hover': {
                        bgcolor: 'rgba(46, 139, 87, 0.05)'
                    }
                };
            case 'primary':
            default:
                return {
                    bgcolor: 'primary.main',
                    color: '#fff',
                    '&:hover': {
                        bgcolor: '#246b43',
                        transform: 'translateY(-2px)'
                    }
                };
        }
    };

    return (
        <MuiButton
            sx={{
                borderRadius: '8px',
                py: 1.2,
                px: 3,
                fontWeight: 600,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                boxShadow: variant === 'text' || variant === 'outlined' ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
                ...getStyles(),
                ...sx
            }}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
