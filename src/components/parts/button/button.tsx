import React, { FunctionComponent, ReactNode } from 'react';
import './style.css';

interface ButtonProps {
    theme?: ButtonThemes;
    className?: string;
    children: ReactNode;
}


export enum ButtonThemes {
    CIRCLE = 'CIRCLE',
    BOX = 'BOX',
}


enum ModifierClassNames {
    CIRCLE = 'button--circle',
    BOX = 'button--box',
}

const Button: FunctionComponent<ButtonProps> = ({ theme = ButtonThemes.BOX, className = '', children }) => (
    <button className={['button', ModifierClassNames[theme]].join(' ')}>{children}</button>
);

export default Button;
