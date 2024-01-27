import React, { FunctionComponent, ReactNode } from 'react';
import './style.css';

interface InputProps {
    theme?: InputThemes;
    className?: string;
    placeholder?: string;
    type?: string;
}

export enum InputThemes {
    NEWMOPHISM = 'NEWMOPHISM',
    SQUARE = 'SQUARE'
}

enum ModifierClassNames {
    NEWMOPHISM = 'input--newmophism',
    SQUARE = 'input--square',
}

const Input: FunctionComponent<InputProps> = ({ theme = InputThemes.NEWMOPHISM, className = '', placeholder = '', type = ''}) => (
    <input className={['input', ModifierClassNames[theme]].join(' ')} placeholder={placeholder} type={type}></input>
);


export default Input;