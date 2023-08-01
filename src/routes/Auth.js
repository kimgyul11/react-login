import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Auth() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        console.log(data);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
          required
        />
        <input
          type="submit"
          value={newAccount ? "새로운 계정 생성" : "로그인"}
        />
        <div>{error}</div>
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "로그인" : "계정 생성하기"}
      </span>
      <div>
        <button>구글로 로그인</button>
        <button>깃허브로 로그인</button>
      </div>
    </div>
  );
}
