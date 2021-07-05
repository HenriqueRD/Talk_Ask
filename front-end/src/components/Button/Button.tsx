import { ButtonHTMLAttributes } from "react";
import { useTheme } from "../../hook/useTheme";

import './cpButton.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLine?: boolean
};

export function Button({isOutLine = false, ...props} : ButtonProps) {
    
    const { theme } = useTheme();

    return (
        <button id="cpButton" className={` ${theme} ${isOutLine ? 'outline' : ''}`} {...props}>
            {props.title}
        </button>
    );
}
  
export default Button;