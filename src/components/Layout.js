import React from "react";
import styles from "../style/Layout.module.css";
export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
