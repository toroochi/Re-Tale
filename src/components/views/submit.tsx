import React, { FunctionComponent, useState } from 'react';
import Form from '../templates/form/form';
import Logo from '../parts/logo/logo';

const Submit: FunctionComponent = () => {
    const [formContent, setFormContent] = useState('ログイン');
    const [formMessage, setFormMessage] = useState('ユーザー登録が済んでいない方へ');
    const [formLogsign, setFormLogsign] = useState('ログイン');
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) {
            setFormContent('ログイン'); // 元のフォームの内容を設定します
            setFormMessage('ユーザー登録が済んでいない方へ'); // 元のメッセージを設定します
            setFormLogsign('ログイン');
        } else {
            setFormContent('サインアップ'); // 新しいフォームの内容を設定します
            setFormMessage('ユーザー登録がお済みの方へ'); // 新しいメッセージを設定します
            setFormLogsign('サインアップ')
        }
        setIsClicked(!isClicked);
    }
    return (
        <>
            <Form content={formContent} message={formMessage} linkPath='#' onClick={handleClick} logsign={formLogsign}></Form>
        </>
    )
}

export default Submit;