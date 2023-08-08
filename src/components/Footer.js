import React from "react";
import styles from "../style/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer_wrap}>
      &copy;{new Date().getFullYear()}
    </footer>
  );
}
