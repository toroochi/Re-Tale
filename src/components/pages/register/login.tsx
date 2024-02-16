import React, { FunctionComponent, useState, useEffect } from 'react';
import Form from '../../templates/form/form';
import Logo from '../../parts/logo/logo';
import './style.css';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../../views/firebase';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";

const Login: FunctionComponent = () => {
    const [formContent, setFormContent] = useState('ログイン');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        user ?
        (
            <Navigate to={`/`} />
        ) : (
        <body>
            <div className="container">
                <div className='logoPosition'>
                    <Logo></Logo>
                </div>
                <Form content={formContent} className='formPosition' message="ユーザー登録が済んでいない方へ"></Form>
            </div>
        </body>
        )
    )
}

export default Login;
