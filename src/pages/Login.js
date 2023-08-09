import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import SignupInput from "../components/SignupInput";
import styles from "../style/Login.module.css";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const onClickHandler = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <div className={styles.login_component}>
      {isLogin ? (
        <LoginInput onClickHandler={onClickHandler} isLogin={isLogin} />
      ) : (
        <SignupInput onClickHandler={onClickHandler} isLogin={isLogin} />
      )}
    </div>
  );
}
