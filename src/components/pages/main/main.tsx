import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter, Router, Routes, Route, Navigate, Link, useNavigate} from 'react-router-dom';
import Header from '../../parts/header/header';
import {
    onAuthStateChanged,
    signOut,
    deleteUser,
} from "firebase/auth";
import { auth } from '../../views/firebase';
import { doc, getDoc } from "firebase/firestore";
import Button from '../../parts/button/button';
import Novel from '../../parts/novel/novel';
import './style.css';


const Main: FunctionComponent = () => {
    const [user, setUser] = useState("");

    const navigate = useNavigate();

    return(
        <body>
            <Header></Header>
            <div className='box'>
            
            <p>新着の小説</p>
            <Novel link='/' content='中身を見る' title='a' summary='a' author='a'></Novel>
            <p>完結している小説</p>
            </div>
        </body>
    )
}

export default Main;
