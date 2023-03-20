import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import { SET_IS_SAVED } from "../redux/slice/saveSlice";

const Div = styled.div`
  button {
    background-color: transparent;
    border: none;
    font-size: 30px;
    padding-bottom: 6px;
    :hover {
      color: #f73859;
    }
  }
`;

function Save({ docId }) {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const isSaved = useSelector((state) => state.save.isSaved);

  useEffect(() => {
    const getSaved = () => {
      let list = [];
      const q = query(
        collection(db, "Saved"),
        where("userId", "==", user.uid),
        where("boardItemId", "==", docId)
      );
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id });
        });
        if (list.length === 1) {
          dispatch(
            SET_IS_SAVED({
              isSaved: true,
            })
          );
        } else {
          dispatch(
            SET_IS_SAVED({
              isSaved: false,
            })
          );
        }
      });
    };
    getSaved();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Saved"), {
      userId: user.uid,
      boardItemId: docId,
    });
  };

  return (
    <Div>
      {isSaved.isSaved === true ? (
        <button>
          <RiBookmarkFill />
        </button>
      ) : (
        <button>
          <RiBookmarkLine onClick={handleSave} />
        </button>
      )}
    </Div>
  );
}

export default Save;
