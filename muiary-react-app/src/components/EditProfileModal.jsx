import { Avatar, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { UserData } from "../context/UserDataContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Tooltip } from "../components/tooltips/Tooltip";
import ImageEditor from "./ImageEditor";
import { UserAuth } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBg};
  top: 0;
  right: 0;
  left: 0;
`;

const ModalContainer = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.bgColor};
    width: 500px;
    height: 600px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.modalBoxShadow};
    overflow: hidden;
  }
`;

const Header = styled(Grid)`
  && {
    padding: 20px 20px 10px 20px;
    .close-btn {
      background-color: transparent;
      border: none;
      height: max-content;
      padding: 0;
      .icon {
        font-size: 30px;
      }
      :hover {
        color: #f73859;
      }
    }
    .btn {
      border: none;
      background-color: black;
      color: white;
      border-radius: 20px;
      padding: 6px 20px 6px 20px;
      font-size: 16px;
      font-weight: 600;
      :hover {
        background-color: #f73859;
      }
    }
    .title {
      font-size: 23px;
      font-weight: 700;
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const FormContainer = styled(Grid)`
  && {
    max-height: 520px;
    width: 500px;
    padding: 13px;
    overflow-y: auto;
    .submit-form {
      margin: 0 auto;
    }
    p {
      margin: 18px 0 5px 0;
      font-weight: 600;
      color: #a3a3a3;
    }
    input,
    textarea {
      width: 437px;
      border-radius: 20px;
      border: ${(props) => props.theme.inputBorder};
      padding: 10px;
      font-size: 15px;
      background-color: ${(props) => props.theme.inputBg};
      color: ${(props) => props.theme.textColor};
    }
    .bio-div {
      textarea {
        height: 100px;
        resize: none;
      }
    }
    .avatar-div {
      margin: 10px 0px 10px 0px;
      display: flex;
      .file-input {
        display: none;
      }
      .avatar-wrapper {
        margin: 0 auto;
        position: relative;
        width: max-content;
      }
      .avatar {
        width: 150px;
        height: 150px;
        margin: 0 auto;
        filter: brightness(70%);
      }
    }
    .icon {
      cursor: pointer;
      color: #fff;
      background-color: #000000b8;
      border-radius: 50%;
      padding: 10px;
      font-size: 32px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      :hover {
        background-color: #00000096;
      }
    }
    .input-wrapper {
      input {
        width: 410px;
      }
      .add-icon {
        cursor: pointer;
        width: 27px;
        height: 100%;
        :hover {
          color: #f73859;
        }
      }
    }
  }
`;

function EditProfileModal({ setEditModal }) {
  const { users } = UserData();
  const { user } = UserAuth();
  const navi = useNavigate();
  const [profileImgUrl, setProfileImgUrl] = useState(users.profileImgUrl);
  const [nickname, setNickname] = useState(users.nickname);
  const [bio, setBio] = useState(users.bio);
  const [location, setLocation] = useState(users.location);
  const [profileLink, setprofileLink] = useState(users.profileLink);
  const [fileName, setFileName] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [preview, setPreview] = useState("");
  const [editImg, setEditImg] = useState(false);

  useEffect(() => {
    if (user?.photoURL) {
      setProfileImgUrl(user.photoURL);
    }
  }, [user]);

  const handleUpload = (e) => {
    try {
      setFileName(`${user.uid}`);
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImgFile(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setEditImg(true);
      e.target.value = null;
    } catch (error) {
      e.target.value = null;
      setEditImg(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (preview) {
      const storageRef = ref(storage, `${user.uid}`);
      const imagesRef = ref(storageRef, fileName);
      await uploadString(imagesRef, preview, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setProfileImgUrl(url);
          updateProfile(user, { photoURL: url });
          updateDoc(doc(db, `users/${user.uid}`), {
            profileImgUrl: url,
          });
        });
      });
    }
    await updateDoc(doc(db, `users/${user.uid}`), {
      nickname: nickname,
      bio: bio,
      location: location || "",
      profileLink: profileLink || "",
    });
    navi(0);
  };

  return (
    <Background>
      <ModalContainer container direction="column">
        {editImg ? (
          <ImageEditor
            imgFile={imgFile}
            setImgFile={setImgFile}
            setEditImg={setEditImg}
            setPreview={setPreview}
          />
        ) : (
          <>
            <Header container justifyContent="space-between">
              <Grid item>
                <button
                  className="close-btn"
                  onClick={() => setEditModal(false)}
                >
                  <MdClose className="icon" />
                </button>
              </Grid>
              <Grid item xs={8}>
                <p className="title">Edit profile</p>
              </Grid>
              <Grid item>
                <button className="btn" type="submit" form="submit-form">
                  Save
                </button>
              </Grid>
            </Header>
            <Divider />
            <FormContainer container>
              <form
                id="submit-form"
                onSubmit={handleUpdate}
                className="submit-form"
              >
                <Grid item xs={12} className="avatar-div">
                  <div className="avatar-wrapper">
                    <Avatar
                      className="avatar"
                      src={!preview ? profileImgUrl : preview}
                    />
                    <Tooltip message="Add Photo" direction="icon-btn-bottom">
                      <label htmlFor="file-input">
                        <AddPhotoAlternateIcon className="icon" />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="file-input"
                        className="file-input"
                        onChange={handleUpload}
                      />
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item xs={12} className="nickname-div">
                  <label htmlFor="nickname">
                    <p>Nickname</p>
                  </label>
                  <input
                    value={nickname}
                    id="nickname"
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} className="bio-div">
                  <label htmlFor="bio">
                    <p>Bio</p>
                  </label>
                  <textarea
                    value={bio}
                    id="bio"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="location">
                    <p>Location</p>
                  </label>
                  <input
                    value={location}
                    id="location"
                    placeholder="Add your Location"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="website">
                    <p>Website</p>
                  </label>
                  <Grid item>
                    <input
                      placeholder="Add Link"
                      id="website"
                      className="website-input"
                      value={profileLink}
                      onChange={(e) => {
                        setprofileLink(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </form>
            </FormContainer>
          </>
        )}
      </ModalContainer>
    </Background>
  );
}

export default EditProfileModal;
