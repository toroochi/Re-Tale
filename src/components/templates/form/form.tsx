import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import book from './book.png';
import Button from '../../parts/button/button';
import Input from '../../parts/input/input';

interface FormProps {
    content?: string;
    className?: string;
    message?: string;
    linkPath: string;
    logsign?: string;
    onClick: () => void; // リンク先のパスを追加
}

const Form: FunctionComponent<FormProps> = ({className,content,message,linkPath,onClick,logsign}) => {
    return (
        <div className={className}>
            <div className='form'>
                <h2>{content}</h2>
                <Input placeholder='メールアドレス' type='text'></Input>
                <Input placeholder='パスワード' type='password'></Input>
                <Link to={linkPath} onClick={onClick}>{message}</Link>
                <Button className='size'>{logsign}</Button>
            </div>
        </div>
    )
}

export default Form;
