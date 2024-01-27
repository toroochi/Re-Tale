import React, { FunctionComponent } from 'react';
import Button, { ButtonThemes } from './components/parts/button/button';
import Header from './components/parts/header/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: FunctionComponent = () => (
  <Router>
    <body>
      <Header />
      <Button theme={ButtonThemes.BOX}>投稿する</Button>
      <Button theme={ButtonThemes.CIRCLE}>こん</Button>
    </body>
  </Router>
);

export default App;
