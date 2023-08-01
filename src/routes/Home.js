import React from "react";
import { authService } from "../api/fbase";

export default function Home() {
  const { email } = authService.currentUser;
  return (
    <>
      <div>{email}님 환영합니다.</div>
    </>
  );
}
