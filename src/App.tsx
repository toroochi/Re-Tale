import { FunctionComponent, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import type { User } from "firebase/auth";
import { auth } from "./components/views/firebase"
import Submit from './components/pages/register/submit';
import Main from './components/pages/main/main';
import Info from './components/pages/info/info';
import Login from './components/pages/register/login';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
