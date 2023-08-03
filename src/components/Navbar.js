import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/fbase";

export default function Navbar({ userObj }) {
  const isLoggedIn = userObj;
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
        {isLoggedIn && (
          <li>
            <button onClick={onLogOutClick}>로그아웃</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
