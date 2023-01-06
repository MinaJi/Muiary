import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { auth, db } from "../firebase-config";

function BoardItem() {
  const { user } = UserAuth();
  const [boardItem, setBoardItem] = useState();

  useEffect(() => {
    const docRef = doc(db, `${user?.uid}/boardItems`);
    const docSnap = getDoc(docRef);

    const ordersRef = collection(db, `users/${user?.uid}/boardItems`);
    const ordersQuerySnapshot = getDocs(ordersRef);

    ordersQuerySnapshot.docs.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  }, []);

  return <div></div>;
}

export default BoardItem;
