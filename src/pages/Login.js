import React from "react";
import styles from "../style/Login.module.css";
export default function Login() {
  return (
    <div className={styles.login_wrap}>
      <div className={styles.title_wrap}>
        로그인 ----
        <br />
        아이디와 비밀번호를
        <br />
        입력해주세요
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <div className={styles.inputTitle}>이메일 주소</div>
          <div className={styles.inputWrap}>
            <input type="text" placeholder="이메일을 입력해주세요" />
          </div>
          <div className={styles.errorMessage}>올바른 이메일 형식을 입력</div>
        </div>
        <div className={styles.content}>
          <div className={styles.inputTitle}>이메일 주소</div>
          <div className={styles.inputWrap}>
            <input type="text" placeholder="비밀번호를 입력해주세요" />
          </div>
          <div className={styles.errorMessage}>
            영문,숫자,특수문자 포함 8자 이상 입력해주세요
          </div>
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <button>구글 아이디로 로그인</button>
        <button>확인</button>
      </div>
    </div>
  );
}
