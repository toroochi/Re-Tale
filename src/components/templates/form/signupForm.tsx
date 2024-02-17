import React, { FunctionComponent, useState, useEffect} from 'react';
import './style.css';
import Button from '../../parts/button/button';
import Input from '../../parts/input/input';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../../views/firebase';

import {
    createUserWithEmailAndPassword,
    getAuth
} from "firebase/auth";
import { Link, useNavigate} from 'react-router-dom';

import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

interface FormProps {
    content?: string;
    className?: string;
    message?: string;
}

const SignUpForm: FunctionComponent<FormProps> = ({className,content,message}) => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [username, setUsername] = useState("");
    const [inputValue, setInputValue] = useState('');

    const db = getFirestore();
    const auth = getAuth();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        );
        const uid = userCredential.user.uid;
        setUsername(inputValue);
        await setDoc(doc(db, "users", uid), {
            username: inputValue,
        });

        } catch(error) {
            console.log(error)
        }
    };  
    
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
        };
    
    

    return (
        <div className={className}>
            <div className='form'>
                <h1>{content}</h1>
                <div className='height'>
                    <Input
                    placeholder='ユーザーネーム'
                    type='text'
                    onChange={handleInputChange}
                    ></Input>
                </div>
                <div className='height'>
                    <Input 
                    placeholder='メールアドレス' 
                    type='email' 
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    ></Input>
                </div>
                <div className='height'>
                    <Input 
                    placeholder='パスワード' 
                    type='password'
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    ></Input>
                </div>
                <div className='height'>
                    <Link to={"/login"} className='link'>{message}</Link>
                </div>
                <div className='height'>
                    <Button className='size' onClick={(e) => handleSubmit(e as any)}>サインアップ</Button>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm;
