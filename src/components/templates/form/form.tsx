import React, { FunctionComponent, useState, useEffect, FormEvent} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './style.css';
import book from './book.png';
import Button from '../../parts/button/button';
import Input from '../../parts/input/input';
import { auth } from '../../views/firebase';
import { User } from "firebase/auth";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";

interface FormProps {
    content?: string;
    className?: string;
    message?: string;
    logsign?: string;
    onClick?: () => void; 
}

const Form: FunctionComponent<FormProps> = ({className,content,message,onClick,logsign}) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState<User | null>(null);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
            );
        } catch(error) {
            alert("メールアドレスまたはパスワードが間違っています");
        }
    };
    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);
    
    return (
        <div className={className}>
            <form className='form' onSubmit={handleSubmit}>
                <h1>{content}</h1>
                <div className='height'>
                    <Input 
                    placeholder='メールアドレス' 
                    type='text' 
                    onChange={(e) => setLoginEmail(e.target.value)}
                    ></Input>
                </div>
                <div className='height'>
                    <Input 
                    placeholder='パスワード' 
                    type='password'
                    onChange={(e) => setLoginPassword(e.target.value)}
                    ></Input>
                </div>
                <div className='height'>
                    <Link to={"/register"} onClick={onClick} className='link'>{message}</Link>
                </div>
                <div className='height'>
                    <Button className='size' type="submit">ログイン</Button>
                </div>
            </form>
        </div>
    )
}

export default Form;
