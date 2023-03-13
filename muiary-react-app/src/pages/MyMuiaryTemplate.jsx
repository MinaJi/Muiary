import React, { useEffect, useState } from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
import { IoSettingsOutline } from "react-icons/io5";
import moment from "moment";
import "animate.css";
import { useDispatch } from "react-redux";
import { SET_USER_STATE } from "../redux/slice/userSlice";

const DivContainer = styled.div`
  .left-div {
    width: 18%;
    float: left;
    z-index: 200;
  }
  .right-div {
    width: 82%;
    float: right;
    margin-top: 75px;
  }
`;

const SideDiv = styled.div`
  background-color: ${(props) => props.theme.profileBgColor};
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  position: fixed;
  top: 0;
  margin-top: 65px;
  @media screen and (max-width: 615px) {
    height: 20vh;
    width: 100vw;
  }
  .left-div-contents {
    display: flex;
    height: 90%;
    display: flex;
    flex-flow: column;
  }
  .theme-settings {
    margin-top: auto;
  }
  .edit-theme-btn {
    border: none;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 14px;
    padding: 0px 0px 10px 7%;
    font-weight: 500;
    :hover {
      color: #f73859;
    }
  }
  .span-div {
    .icon {
      margin-right: 3px;
    }
    display: flex;
  }
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
    animation: jello;
    animation-duration: 1.1s;
    animation-iteration-count: infinite;
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
  const dispatch = useDispatch();

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
          const timestamp = doc.data().dateOfBirth.seconds;
          const Date = moment.unix(timestamp);
          const dateFormat = Date.format("MMMM DD");
          userList.push({
            id: doc.id,
            birthday: dateFormat,
            ...doc.data(),
          });
        });
        dispatch(
          SET_USER_STATE({
            userId: userList[0].id,
            username: userList[0].username,
          })
        );
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
        snapshot.data() && setBgColor(snapshot.data().backgroundColor);
        snapshot.data() && setTextColor(snapshot.data().textColor);
      } catch (error) {
        console.log(error);
      }
    };
    getUserTheme();
  }, [bgColor, textColor]);

  return (
    <DivContainer>
      <SideDiv
        style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        className="left-div"
      >
        {Object.keys(userData).map((item, i) => (
          <div key={i} className="left-div-contents">
            <div>
              <MuiaryProfile userData={userData} userId={userData[item].id} />
            </div>
            <div className="theme-settings">
              {user.uid === userData[item].id && (
                <div
                  className="edit-theme-btn"
                  onClick={() => setEditModal(true)}
                >
                  <div className="span-div">
                    <IoSettingsOutline className="icon" />
                    <span>Theme settings</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </SideDiv>
      <div className="right-div">
        <Outlet />
      </div>
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
    </DivContainer>
  );
}

export default MyMuiaryTemplate;
