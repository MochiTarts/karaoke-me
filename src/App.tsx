import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Home, Karaoke, CreateRoom, JoinRoom } from './pages';
import { Navbar } from './components';
import { GuardedRoute } from './guards';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API } from './services';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    API.me().then((res) => {
      console.log(res);
      if (!res.error) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    })
  }, []);

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
