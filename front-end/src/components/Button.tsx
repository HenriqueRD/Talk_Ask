import { ButtonHTMLAttributes } from "react";

import '../styles/cpButton.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLine?: boolean
};

export function Button({isOutLine = false, ...props} : ButtonProps) {
    return (
        <button id="cpButton" className={` ${isOutLine ? 'outline' : ''}`} {...props}>
            {props.title}
        </button>
    );
}
  
export default Button;