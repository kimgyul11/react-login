import React, { useEffect, useState } from "react";
import { authService, dbService } from "../api/fbase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default function Home({ userObj }) {
  const { email } = authService.currentUser;
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);
  //구식의 데이터 읽는 방법
  // const getContents = async () => {
  //   const querySnapshot = await getDocs(collection(dbService, "content"));
  //   querySnapshot.forEach((doc) => {
  //     const contentObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setContents((prev) => [contentObj, ...prev]);
  //   });
  // };
  useEffect(() => {
    //getContents();
    const q = query(
      collection(dbService, "content"),
      orderBy("regDate", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setContents(newArray);
    });
  }, []);

  //submit핸들러
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "content"), {
        content,
        regDate: Date.now(),
        creatorId: userObj.uid,
      });
      setContent("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setContent(value);
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder={`${email}님의 하루는 어떤가요?`}
            maxLength={120}
            value={content}
            onChange={onChange}
          />
          <input type="submit" value="Nweet" />
        </form>
      </div>
      <div>
        {contents.map((item) => (
          <div key={item.id}>
            <h4>{item.content}</h4>
          </div>
        ))}
      </div>
    </>
  );
}
