import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "../api/fbase";
import { updateProfile } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuthContext();
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  // const getMyNweets = async () => {
  //   const q = query(
  //     collection(dbService, "content"),
  //     where("creatorId", "==", user.uid),
  //     orderBy("regDate", "desc")
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };
  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    //현재 display이름과 새로운 display이름이 다르다면 업데이트
    if (user.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="프로필 수정" />
      </form>
    </div>
  );
}
