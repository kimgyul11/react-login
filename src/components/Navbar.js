import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/fbase";
import { useAuthContext } from "../context/AuthContext";
import styles from "../style/Navbar.module.css";
import AccordionMenu from "./AccordionMenu";

export default function Navbar() {
  const { user } = useAuthContext();
  const isLoggedIn = user;
  const navigate = useNavigate();
  // const onLogOutClick = () => {
  //   authService.signOut();
  //   navigate("/");
  // };
  const menuItems = [
    {
      title: "프로필",
      method: () => {
        navigate("/profile");
      },
    },
    {
      title: "로그아웃",
      method: () => {
        authService.signOut();
        navigate("/");
      },
    },
  ];
  return (
    <nav className={styles.nav_wrap}>
      <ul className={styles.nev_menuWrap}>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/">분리수거</Link>
        </li>
      </ul>

      {isLoggedIn ? (
        <AccordionMenu items={menuItems} />
      ) : (
        <button>로그인</button>
      )}
    </nav>
  );
}
