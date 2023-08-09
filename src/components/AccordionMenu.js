import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import styles from "../style/Navbar.module.css";

export default function AccordionMenu({ items }) {
  const [active, setActive] = useState(false);
  const { user } = useAuthContext();
  const onToggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className={styles.accordion_menu} onClick={onToggle}>
      <div className={styles.img_wrap}>
        <img
          src={
            user.photoURL
              ? user.photoURL
              : "https://cdn-icons-png.flaticon.com/512/3282/3282224.png"
          }
          alt="profile"
        />
      </div>
      {active &&
        items.map((item, index) => (
          <div
            className={styles.accordion_item}
            key={index}
            onClick={() => item.method()}
          >
            <div className="accordion-title">{item.title}</div>
          </div>
        ))}
    </div>
  );
}
