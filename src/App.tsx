import React, { FunctionComponent, useState } from 'react';
import Button, { ButtonThemes } from './components/parts/button/button';
import Header from './components/parts/header/header';
import Input, {InputThemes} from './components/parts/input/input';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Novel from './components/parts/novel/novel';
import Form from './components/templates/form/form';
import Logo from './components/parts/logo/logo';

const App: FunctionComponent = () => {
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
    <Router>
      <body>
        <div className='App'>
          <Header />
          <Button theme={ButtonThemes.BOX}>投稿する</Button>
          <Button theme={ButtonThemes.CIRCLE}>こん</Button>
          <Input theme={InputThemes.NEWMOPHISM}></Input>
          <Input theme={InputThemes.SQUARE} placeholder='ログイン'></Input>
          <Novel title='あ' author='a' summary='a' content='続きを書く' link=''></Novel>
          <Form content={formContent} message={formMessage} linkPath='#' onClick={handleClick} logsign={formLogsign}></Form>
          <Logo></Logo>
        </div>
      </body>
    </Router>
  )
}

export default App;
