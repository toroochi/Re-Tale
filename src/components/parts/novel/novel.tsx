import React, { FunctionComponent, ReactNode } from 'react';
import './style.css';
import book from './book.png';

const Novel: FunctionComponent = () => {
    return (
        <div>
            <img src={book} className='bookimage'></img>
            <p>タイトル</p>
            <p>著者</p>
            <p>あらすじ</p>
            <button>詳細を見る</button>
        </div>
    )
}

export default Novel;