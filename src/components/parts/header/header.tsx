import React, { FunctionComponent } from 'react';
import { Link } from "react-router-dom";
import './style.css';

const Header: FunctionComponent = () => {
    return (
        <header className="header">
        <Link to="/" className="logo">
            Re : Tale
            </Link>
            <nav>
            <ul className="nav-links">
                <li className="nav-links--item">
                <Link to="/">ホーム</Link>
                </li>
                <li className="nav-links--item">
                <Link to="/about">概要</Link>
                </li>
                <li className="nav-links--item">
                <Link to="/writting">執筆</Link>
                </li>
                <li className="nav-links--item">
                <Link to="/user">ユーザー</Link>
                </li>
                <li className="nav-links--item">
                <Link to="/">要望フォーム</Link>
                </li>
            </ul>
            </nav>
            <br></br>
        </header>
    )
}

export default Header;