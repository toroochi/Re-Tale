import React, { FunctionComponent, ReactNode } from 'react';
import './style.css';

interface ButtonProps {
    theme?: ButtonThemes;
    className?: string;
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    type?: string;
}


export enum ButtonThemes {
    CIRCLE = 'CIRCLE',
    BOX = 'BOX',
}


enum ModifierClassNames {
    CIRCLE = 'button--circle',
    BOX = 'button--box',
}

const Button: FunctionComponent<ButtonProps> = ({ theme = ButtonThemes.BOX, className = '', children,onClick, type}) => (
    <button className={['button', ModifierClassNames[theme]].join(' ')} onClick={onClick} >{children}</button>
);

export default Button;
