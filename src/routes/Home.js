import React, { useEffect, useRef, useState } from "react";
import { authService, dbService } from "../api/fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Content from "../components/Content";

export default function Home({ userObj }) {
  const { email } = authService.currentUser;
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);
  const [attachement, setAttachement] = useState();
  const fileInput = useRef();
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
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const isFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachement(result);
    };
    reader.readAsDataURL(isFile);
  };
  const onClearPhotClick = () => {
    setAttachement(null);
    fileInput.current.value = null;
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
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput}
          />
          <input type="submit" value="Nweet" />
          {attachement && (
            <div>
              <img src={attachement} width="50px" height="50px" />
              <button onClick={onClearPhotClick}>취소</button>
            </div>
          )}
        </form>
      </div>
      <div>
        {contents.map((contentObj) => (
          <Content
            key={contentObj.id}
            contentObj={contentObj}
            isOwner={contentObj.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}
