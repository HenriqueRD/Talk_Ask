import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'

export function useTheme() {
    const theme = useContext(ThemeContext);

    return theme;
}