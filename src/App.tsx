import { FunctionComponent, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./components/views/firebase"
import firebase from 'firebase/compat/app';
import type { User } from "firebase/auth";
import { auth } from "./components/views/firebase"
import Submit from './components/pages/register/submit';
import Main from './components/pages/main/main';
import Info from './components/pages/info/info';
import Login from './components/pages/register/login';
import UserSetting from './components/pages/user/User';
import Writting from './components/pages/wriiting/writting';
import WrittingForm from './components/pages/wriiting/writtingform';
import View from './components/pages/wriiting/view';
import About from './components/pages/about/about';
import { config } from 'localforage';

type UserType = User | null;

const App: FunctionComponent = () => {

  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const authStateChanged = auth.onAuthStateChanged((user) => {
      console.log(user?.email)
      setUser(user);
    });
    return () => {
      authStateChanged();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/register'} element={user ? <Navigate to="/" /> : <Submit />}></Route>
        <Route path={'/'} element={!user ? <Navigate to="/register" /> : <Main />}></Route>
        <Route path={'/info'} element={<Info />}></Route>
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/user'} element={<UserSetting />}></Route>
        <Route path={'/writting'} element={<Writting />}></Route>
        <Route path="/writtingform/:id?" element={<WrittingForm />} />
        <Route path="/view/:id?" element={<View />} />
        <Route path={'/about'} element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
