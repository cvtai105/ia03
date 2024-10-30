import './App.css';
import React from 'react';
import { createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


const routes = createRoutesFromElements(  
  <>
    <Route path="/" element={<Home />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/register" element={<Register />} />
  </>
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;