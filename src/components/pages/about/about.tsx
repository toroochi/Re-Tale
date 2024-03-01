import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter, Router, Routes, Route, Navigate, Link } from 'react-router-dom';


import Header from '../../parts/header/header';
import Button from '../../parts/button/button';

import WritteImage from '../../images/1.png'
import PostImage from '../../images/2.png';
import RelayImage from '../../images/3.png';
import ReadImage from '../../images/4.png';
import "./style.css"


const About: FunctionComponent = () => {
    return(
        <body>
            <Header></Header>
            
            <div className='box'>
                <div className='box-conteinar'>
            <p className='title-text'>Re:Taleって？</p>
                <div className='set-text'>
                    <p className='set-text'>①執筆する　</p>
                    <p className='set-text'>②投稿する　</p>
                    <p className='set-text'>③誰かの小説に続ける　</p>
                    <p className='set-text'>④誰かの小説を読む　</p>
                </div>
                <div className='set'>
                    <img src={PostImage} />
                    <img src={RelayImage} />
                    <img src={ReadImage} />
                    <img src={WritteImage} />
                    
                </div>
                    
                <p>Re:Taleは、昔のオタク文化でもあった、リレー小説をWebサービスで表現したものとなります。</p>
                <p>リレー小説とは、小説をみんなで少しずつ完成させていく共同作業となります。</p>
                <p>当サイト制作者も紛れもないオタクであり、懐かしくなって制作してみました。</p>
                <p>個人制作サービスなため、まだ至らぬ点は多々あるかと思いますが、皆様の良きオタライフ/小説ライフを願っております。</p>
                <div/>
                </div>
            </div>
        </body>
    )
}

export default About;
