import React, { FunctionComponent } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Logo: FunctionComponent = () => {
    return (
        <>
            <p className='context'>みんなと、小説を紡ぐ。</p>
            <h1 className='toplogo'>Re : Tale</h1>
            <div className='parent'>
                <Link to={"/info"} className='infolink'>Re:Taleについて</Link>
            </div>

        </>
    )
}

export default Logo;