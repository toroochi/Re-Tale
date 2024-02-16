import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter, Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './infostyle.css';

import Header from '../../parts/header/header';
import Button from '../../parts/button/button';

import WritteImage from '../../images/1.png'
import PostImage from '../../images/2.png';
import RelayImage from '../../images/3.png';
import ReadImage from '../../images/4.png';



const Info: FunctionComponent = () => {
    return(
        <body>
            <p className='title'>Re:Taleって？</p>
            <p>〜こんなことができます〜</p>
            <img src={WritteImage}></img>
            <p>①執筆する</p>
            <img src={PostImage}></img>
            <p>②投稿する</p>
            <img src={RelayImage}></img>
            <p>③誰かの小説に続ける</p>
            <img src={ReadImage}></img>
            <p>④誰かの小説を読む</p>
            <p>Re:Taleは、昔のオタク文化でもあった、リレー小説をWebサービスで表現したものとなります。</p>
            <p>リレー小説とは、小説をみんなで少しずつ完成させていく共同作業となります。</p>
            <p>当サイト制作者も紛れもないオタクであり、懐かしくなって制作してみました。</p>
            <p>個人制作サービスなため、まだ至らぬ点は多々あるかと思いますが、皆様の良きオタライフ/小説ライフを願っております。</p>
            <Link to={"/register"}><Button children="登録してみる？"></Button></Link>
        </body>
    )
}

export default Info;