import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Home, Karaoke, CreateRoom, JoinRoom } from './pages';
import { Navbar } from './components';
import { GuardedRoute } from './guards';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API } from './services';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  //const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <div id="filter">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/karaoke" element={<Karaoke />} />
          <Route element={
              <GuardedRoute auth={isAuthenticated} redirect="/" />
            }
          >
            <Route path="/create-room" element={<CreateRoom />} />
          </Route>
          <Route element={
              <GuardedRoute auth={isAuthenticated} redirect="/" />
            }
          >
            <Route path="/join-room" element={<JoinRoom />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
