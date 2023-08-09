import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import SignupInput from "../components/SignupInput";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const onClickHandler = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <>
      {isLogin ? (
        <LoginInput onClickHandler={onClickHandler} isLogin={isLogin} />
      ) : (
        <SignupInput onClickHandler={onClickHandler} isLogin={isLogin} />
      )}
    </>
  );
}
