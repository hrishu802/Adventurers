import React from 'react';
import { Paper, InputBase, IconButton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, placeholder = "Search destinations..." }) => {
    return (
        <Paper
            component="form"
            onSubmit={onSearch}
            sx={{
                p: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 600,
                borderRadius: 50,
                boxShadow: '0 8px 32px rgba(30, 58, 95, 0.1)',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
            }}
        >
            <IconButton sx={{ p: '12px', color: 'primary.main' }} aria-label="location">
                <LocationOnIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1, fontFamily: 'Inter, sans-serif' }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': placeholder }}
                value={value}
                onChange={onChange}
            />
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <IconButton
                type="submit"
                sx={{
                    p: '12px',
                    bgcolor: 'accent.main',
                    color: '#fff',
                    '&:hover': {
                        bgcolor: '#e65c2b',
                        transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s'
                }}
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
