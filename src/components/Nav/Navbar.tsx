import React from 'react';
import './Navbar.scss';
import { API } from "../../services";
import { useSearchParams, Link } from 'react-router-dom';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const loginHandler = (event: any) => {
    event.preventDefault();
    console.log(window.location.href);
    const loginUrlPage = `${process.env.REACT_APP_BACKEND_ENDPOINT}/login`;
    // Iterate through the search params and add them to the login url
    searchParams.forEach((value, key) => {
      console.log(key, value);
      //loginUrlPage.concat(`&${key}=${value}`);
    });
    window.location.href = loginUrlPage;
  };

  const logoutHandler = (event: any) => {
    event.preventDefault();
    const logoutPage = `${process.env.REACT_APP_BACKEND_ENDPOINT}/logout`;
    window.location.href = logoutPage;
  };

  React.useEffect(() => {
    // Check if session cookie is set
    API.me().then((res) => {
      if (!res.error) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
  }, []);
      

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/create-room">Create a Room</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/join-room">Join a Room</a>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {!loggedIn && (
              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={loginHandler}>
                  Login
                </a>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={logoutHandler}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;