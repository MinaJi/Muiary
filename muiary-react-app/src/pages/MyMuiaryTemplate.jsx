import React, { useEffect, useState } from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import MyBoardItemLists from "../components/MyBoardItemLists";
import { FaPen } from "react-icons/fa";
import BoardHeader from "../components/BoardHeader";
import EditThemeModal from "../components/EditThemeModal";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";

const SideDiv = styled.div`
  background-color: ${(props) => props.theme.profileBgColor};
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  width: 17%;
  position: fixed;
  top: 0;
  margin-top: 65px;
  @media screen and (max-width: 615px) {
    height: 20vh;
    width: 100vw;
  }
  .edit-theme-btn {
    background-color: transparent;
    border: none;
  }
`;

const Feed = styled.div`
  width: 83%;
  margin-left: 17%;
  padding-top: 65px;
`;

const Btn = styled.button`
  background-color: #f73859;
  border-radius: 50%;
  border: none;
  width: 80px;
  height: 80px;
  color: white;
  font-size: 28px;
  position: fixed;
  bottom: 4rem;
  right: 5rem;
  box-shadow: rgba(97, 97, 97, 0.29) 5px 10px 15px;
  :hover {
    background-color: black;
    animation: bounce 0.4s;
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
    animation-iteration-count: infinite;
    @keyframes bounce {
      from {
        transform: translate3d(0, 0, 0);
      }
      to {
        transform: translate3d(0, 20px, 0);
      }
    }
  }
`;

function MyMuiaryTemplate() {
  const navi = useNavigate();
  const { username } = useParams();
  const { user } = UserAuth();
  const [userData, setUserData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    let userList = [];
    const getUserData = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", `${username}`)
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUserData(userList);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getUserTheme = async () => {
      try {
        const snapshot = await getDoc(doc(db, "userTheme", username));
        setBgColor(snapshot.data().backgroundColor);
        setTextColor(snapshot.data().textColor);
      } catch (error) {
        console.log(error);
      }
    };
    getUserTheme();
  }, [bgColor, textColor]); // ?

  return (
    <>
      <SideDiv style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}>
        <div>
          <MuiaryProfile userData={userData} />
        </div>
        {Object.keys(userData).map((item, i) => (
          <div key={i}>
            {user.uid === userData[item].id && (
              <button
                className="edit-theme-btn"
                onClick={(e) => setEditModal(true)}
              >
                Theme settings
              </button>
            )}
          </div>
        ))}
      </SideDiv>
      <Feed>
        <MyBoardItemLists />
      </Feed>
      <Btn onClick={() => navi(`/muiary/upload`)}>
        <FaPen />
      </Btn>
      {editModal && (
        <EditThemeModal
          setEditModal={setEditModal}
          username={username}
          userBgColor={bgColor}
          userTextColor={textColor}
          setUserBgColor={setBgColor}
          setUserTextColor={setTextColor}
        />
      )}
    </>
  );
}

export default MyMuiaryTemplate;
