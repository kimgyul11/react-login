import React, { useState } from "react";
import styles from "../style/Login.module.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function LoginInput({ isLogin, onClickHandler }) {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  console.log(isLogin);
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
      if (isLogin) {
        data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data);
      } else {
        data = await createUserWithEmailAndPassword(auth, email, password);
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //로그인 버튼 클릭
  const loginBtn = (e) => {
    onSubmit(e);
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialLogin = async (e) => {
    console.log(e.target.name);
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div className={styles.login_wrap}>
      <div className={styles.title_wrap}>
        환영합니다👋
        <br />
        다양한 일상을 공유해 보세요!
      </div>
      <form onSubmit={onSubmit} className={styles.contentWrap}>
        <div>
          <div className={styles.content}>
            <div className={styles.inputTitle}>이메일 주소</div>
            <div className={styles.inputWrap}>
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            {/* <div className={styles.errorMessage}>
              올바른 이메일 형식을 입력해주세요!
            </div> */}
          </div>
          <div className={styles.content}>
            <div className={styles.inputTitle}>비밀번호</div>
            <div className={styles.inputWrap}>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            {/* <div className={styles.errorMessage}>
              영문,숫자,특수문자 포함 8자 이상 입력해주세요
            </div> */}
          </div>
          <div className={styles.toggle}>
            <span onClick={onClickHandler}>회원가입</span>
          </div>
        </div>
      </form>

      <div className={styles.buttonWrap}>
        <button name="github" onClick={onSocialLogin}>
          깃허브 아이디로 로그인
        </button>
        <button name="google" onClick={onSocialLogin}>
          구글 아이디로 로그인
        </button>
        <button onClick={loginBtn}>확인</button>
      </div>
    </div>
  );
}
