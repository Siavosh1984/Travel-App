// useState: https://www.w3schools.com/react/react_usestate.asp
// "useEffect": https://www.w3schools.com/react/react_useeffect.asp

import React from 'react';
// Material UI - Overview : https://mui.com/material-ui/getting-started/
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';





const App = () => {

  
  
  return (

    <BrowserRouter> 
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/posts"  element={<Home />} />
          <Route path="/posts/search"  element={<Home />} />
          <Route path="/posts/:id"  element={<PostDetails />} /> 
          <Route path="/auth" index element={<Auth />} />
        </Routes>
        
      </Container>
    </BrowserRouter>
  );
};

export default App;
