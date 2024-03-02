import React from 'react';
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from "../src/components/login/LoginPage";
import RegisterPage from '../src/components/register/Register'
import Homepage from '../src/components/dashboard/homepage/Hompage';
import Checking from '../protection/Protection';
import 'react-calendar/dist/Calendar.css';
import CardDetails from '../src/components/dashboard/share/Share'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Checking Component={Homepage} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/card/:id" element={<CardDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



