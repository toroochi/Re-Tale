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
                <h1>{content}</h1>
                <div className='height'>
                    <Input placeholder='メールアドレス' type='text'></Input>
                </div>
                <div className='height'>
                    <Input placeholder='パスワード' type='password'></Input>
                </div>
                <div className='height'>
                    <Link to={linkPath} onClick={onClick} className='link'>{message}</Link>
                </div>
                <div className='height'>
                    <Button className='size'>{logsign}</Button>
                </div>
            </div>
        </div>
    )
}

export default Form;
