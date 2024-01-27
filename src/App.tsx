import React, { FunctionComponent } from 'react';
import Button, { ButtonThemes } from './components/parts/button/button';
import Header from './components/parts/header/header';
import Input, {InputThemes} from './components/parts/input/input';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Novel from './components/parts/novel/novel';

const App: FunctionComponent = () => (
  <Router>
    <body>
      <div className='App'>
        <Header />
        <Button theme={ButtonThemes.BOX}>投稿する</Button>
        <Button theme={ButtonThemes.CIRCLE}>こん</Button>
        <Input theme={InputThemes.NEWMOPHISM}></Input>
        <Input theme={InputThemes.SQUARE} placeholder='ログイン'></Input>
        <Novel></Novel>
      </div>
    </body>
  </Router>
);

export default App;
