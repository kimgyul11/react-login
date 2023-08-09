import React from "react";
import styles from "../style/Login.module.css";
export default function SignupInput({ isLogin, onClickHandler }) {
  return (
    <div className={styles.login_wrap}>
      <div className={styles.title_wrap}>
        환영합니다🥳
        <br />
        5분이면 OK!
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <div className={styles.inputTitle}>이메일 주소</div>
          <div className={styles.inputWrap}>
            <input type="email" placeholder="이메일을 입력하세요" required />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.inputTitle}>비밀번호</div>
          <div className={styles.inputWrap}>
            <input type="password" placeholder="비밀번호" required />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.inputTitle}>비밀번호 확인</div>
          <div className={styles.inputWrap}>
            <input type="email" placeholder="비밀번호" required />
          </div>
        </div>
        <div className={styles.toggle}>
          <span onClick={onClickHandler}>로그인으로 이동</span>
        </div>
      </div>

      <div className={styles.buttonWrap}>
        <button>확인</button>
      </div>
    </div>
  );
}
