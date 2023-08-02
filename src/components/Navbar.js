import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/fbase";

export default function Navbar() {
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
        <li>
          <button onClick={onLogOutClick}>로그아웃</button>
        </li>
      </ul>
    </nav>
  );
}
