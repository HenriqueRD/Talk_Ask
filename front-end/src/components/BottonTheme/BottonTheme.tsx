import { ButtonHTMLAttributes } from "react";
import { useTheme } from "../../hook/useTheme";

import './cpButton.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLine?: boolean
};

export function BottonTheme({isOutLine = false, ...props} : ButtonProps) {
    
    const { theme } = useTheme();

    return (
        <button id="cpButton">
            
        </button>
    );
}
  
export default BottonTheme;