import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/fbase";
import { useAuthContext } from "../context/AuthContext";
import styles from "../style/Navbar.module.css";

export default function Navbar() {
  const { user } = useAuthContext();
  const isLoggedIn = user;
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <nav className={styles.nav_wrap}>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <Link to="/profile">{user.displayName}님의 프로필</Link>
            </li>
            <li>
              <button onClick={onLogOutClick}>로그아웃</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
