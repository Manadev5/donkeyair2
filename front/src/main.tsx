import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App'
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import {AuthProvider} from './AuthContext';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import Home from './Pages/Home';
import RegistrationUser from './Pages/RegistartionUser';
import LoginUser from './Pages/LoginUser';
import Basket from './Pages/Basket';





const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='registration-user' element={<RegistrationUser />} />
            <Route path='login-user' element={<LoginUser />} />
            <Route path='basket' element={<Basket />} />
            <Route path='pill' element={<App />} />

        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
