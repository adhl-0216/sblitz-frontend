'use client';
import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';

export default function ColorModeToggle(props: IconButtonOwnProps) {
    const { mode, setMode } = useColorScheme();

    if (!mode) {
        return null;
    }

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    const icon = mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />;

    return (
        <IconButton
            data-screenshot="toggle-mode"
            onClick={toggleMode}
            disableRipple
            size="small"
            aria-label="Toggle color mode"
            {...props}
        >
            {icon}
        </IconButton>
    );
}
