import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import { SET_IS_LIKED } from "../redux/slice/likeSlice";

const Div = styled.div`
  button {
    background-color: transparent;
    border: none;
    font-size: 30px;
    padding-bottom: 6px;
    :hover {
      color: #f73859;
    }
    .liked-icon {
      color: #f73859;
    }
  }
`;

function Like({ docId }) {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const isLiked = useSelector((state) => state.like.isLiked);

  useEffect(() => {
    const getLikes = () => {
      let list = [];
      const q = query(
        collection(db, "Likes"),
        where("userId", "==", user.uid),
        where("boardItemId", "==", docId)
      );
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id });
        });
        if (list.length === 1) {
          dispatch(
            SET_IS_LIKED({
              isLiked: true,
            })
          );
        } else {
          dispatch(
            SET_IS_LIKED({
              isLiked: false,
            })
          );
        }
      });
    };
    getLikes();
  }, []);

  const handleLike = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Likes"), {
      userId: user.uid,
      boardItemId: docId,
    });
  };

  const handleUnlike = async () => {
    const q = query(
      collection(db, "Likes"),
      where("userId", "==", user.uid),
      where("boardItemId", "==", docId)
    );
    const snapshot = await getDocs(q);
    await deleteDoc(doc(db, "Likes", `${docId}`)).then(
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      })
    );
    dispatch(
      SET_IS_LIKED({
        isLiked: false,
      })
    );
  };

  return (
    <Div>
      {isLiked.isLiked ? (
        <button onClick={handleUnlike}>
          <RiHeart2Fill />
        </button>
      ) : (
        <button onClick={handleLike}>
          <RiHeart2Line />
        </button>
      )}
    </Div>
  );
}

export default Like;
