import React, { FunctionComponent, useState } from 'react';
import Form from '../../templates/form/form';
import Logo from '../../parts/logo/logo';
import './style.css';
import { Link, Navigate} from 'react-router-dom';
import SignUpForm from '../../templates/form/signupForm';
import { auth } from '../../views/firebase';

const Submit: FunctionComponent = () => {
    const [formContent, setFormContent] = useState('サインアップ');
    const [user, setUser] = useState();

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
                    <SignUpForm content={formContent} className='formPosition' message="ユーザー登録がお済みの方へ"></SignUpForm>
                </div>
            </body>
        )
    )
}

export default Submit;
