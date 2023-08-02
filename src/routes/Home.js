import React, { useEffect, useState } from "react";
import { authService, dbService } from "../api/fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export default function Home() {
  const { email } = authService.currentUser;
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);
  const getContents = async () => {
    const querySnapshot = await getDocs(collection(dbService, "content"));
    querySnapshot.forEach((doc) => {
      const contentObj = {
        ...doc.data(),
        id: doc.id,
      };
      setContents(contentObj);
    });
  };
  useEffect(() => {
    getContents();
  }, []);
  console.log(contents);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "content"), {
        content,
        regDate: Date.now(),
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
    </>
  );
}
