import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../api/fbase";

export default function Content({ contentObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(contentObj.content);
  //삭제 핸들러
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제하실건가요?");
    if (ok) {
      //게시글 삭제
      await deleteDoc(doc(dbService, `content/${contentObj.id}`));
    }
  };
  //수정 핸들러
  const toggleEditing = () => setIsEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    const washingtonRef = doc(dbService, `content/${contentObj.id}`);
    await updateDoc(washingtonRef, {
      content: newContent,
    });
    setIsEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewContent(value);
  };
  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newContent}
              onChange={onChange}
              required
            />
            <input type="submit" value="update content" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{contentObj.content}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제하기</button>
              <button onClick={toggleEditing}>수정하기</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
