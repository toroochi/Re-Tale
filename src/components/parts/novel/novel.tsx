import React, { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import book from './book.png';

interface NovelProps {
    title?: string;
    author?: string;
    summary?: string;
    content?: string;
    link : string;
    className?: string;
}

const Novel: FunctionComponent<NovelProps> = ({ title, author, summary, content, link, className=''}) => {
    return (
        <div className='novel'>
            <img src={book} className='bookimage'></img>
            <div className='contents'>
                <div className='title'>
                    <p>{title} : {author}</p>
                </div>
                <p>{summary}</p>
                <div className='right'>
                <Link to={link} className="background_btn04">{content}</Link>
                </div>
            </div>
        </div>
    )
}

export default Novel;

