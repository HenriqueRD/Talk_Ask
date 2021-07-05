import { createContext, useState, ReactNode, useEffect } from 'react';

type ThemeType = 'light' | 'dark';

type ThemeContextProvider = {
    children: ReactNode,
}

type ThemeContextType = {
    theme: ThemeType,
    changeTheme: () => void;
}
export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProvider) {

    const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
        const current = localStorage.getItem('theme');

        return (current ?? 'light') as ThemeType;
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);

    function changeTheme() {
        if(currentTheme === 'light') {
            setCurrentTheme('dark');
        }
        else {
            setCurrentTheme('light');
        }
    }

    return (
        <ThemeContext.Provider value={{theme: currentTheme, changeTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;