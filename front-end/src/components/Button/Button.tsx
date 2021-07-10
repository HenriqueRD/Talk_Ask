import { ButtonHTMLAttributes } from "react";
import { useTheme } from "../../hook/useTheme";

import './cpButton.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLine?: boolean
};

export function Button({isOutLine = false, ...props} : ButtonProps) {
    
    const { theme } = useTheme();

    return (
        <div className={theme}>
        <button id="cpButton" className={` ${theme} ${isOutLine ? 'outline' : ''}`} {...props}>
            {props.title}
        </button>
        </div>
    );
}
  
export default Button;