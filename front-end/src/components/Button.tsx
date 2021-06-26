import { ButtonHTMLAttributes } from "react";

import '../styles/cpButton.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props : ButtonProps) {

    return (
        <button id="cpButton" {...props}>
            {props.title}
        </button>
    );
  }
  
  export default Button;
  