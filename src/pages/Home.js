import React, { useEffect, useRef, useState } from "react";
import { authService, dbService, storageService } from "../api/fbase";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Content from "../components/Content";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  //state
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  //파일 업로드 관련
  const [attachement, setAttachement] = useState(""); //파일 접근
  const fileInput = useRef();
  const { user } = useAuthContext();

  useEffect(() => {
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

  //게시글 submit핸들러
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (content === "") {
      alert("내용을 입력해주세요!");
      return;
    }
    try {
      setIsUploaded(true);
      let url = "";
      //이미지가 있다면 업로드
      if (attachement !== "") {
        const fileRef = ref(storageService, `${user.uid}/${uuidv4()}`);
        await uploadString(fileRef, attachement, "data_url");
        url = await getDownloadURL(fileRef);
      }
      const newContent = {
        content,
        regDate: Date.now(),
        creatorId: user.uid,
        url,
      };
      await addDoc(collection(dbService, "content"), newContent);
      setContent("");
      setAttachement("");
      fileInput.current.value = null;
      setIsUploaded(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsUploaded(false);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setContent(value);
  };

  //파일 업로드
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
  //취소버튼
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
            placeholder={`님의 하루는 어떤가요?`}
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
          <input type="submit" value="Nweet" disabled={isUploaded} />
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
            isOwner={contentObj.creatorId === user.uid}
          />
        ))}
      </div>
    </>
  );
}
