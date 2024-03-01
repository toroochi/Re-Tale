import React, { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import book from './book.png';

interface NovelProps {
    title?: string;
    author?: string;
    summary?: string;
    content?: string;
    link? : string;
    className?: string;
    tags?: string[];
    onClick?: () => void;
}

const Novel: FunctionComponent<NovelProps> = ({ title, author, summary, content, className='', tags=[], onClick}) => {
    return (
        <div className='novel' >
            <img src={book} className='bookimage'></img>
            <div className='contents'>
                <div className='title'>
                    <p>{title} : {author}</p>
                </div>
                <p>{summary}</p>
                <div className='tags'>
                    {tags.map((tag, index) => (
                        <Link key={index} to={`/writting/${tag}`} className="tag">{tag}</Link>
                    ))}
                </div>
                <div className='right'>
                <button className="background_btn04" onClick={onClick}>{content}</button>
                </div>
            </div>
        </div>
    )
}

export default Novel;
