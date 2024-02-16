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
import './style.css';


const Main: FunctionComponent = () => {
    const [user, setUser] = useState("");

    const navigate = useNavigate();
    const logout = async () => {
        console.log("logout function called"); // Add this line
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
        console.log("logout function completed"); // Add this line
    };
    

    return(
        <body>
            <Header></Header>
            <div className='box'>
            <Button children="ログアウト" onClick={logout}></Button>
            </div>
        </body>
    )
}

export default Main;
