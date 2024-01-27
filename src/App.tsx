import React, { FunctionComponent } from 'react';
import Button, { ButtonThemes } from './components/parts/button';

const App: FunctionComponent = () => (
  <body>
    <Button theme={ButtonThemes.BOX}>投稿する</Button>
    <Button theme={ButtonThemes.CIRCLE}>a</Button>
  </body>
);

export default App;
