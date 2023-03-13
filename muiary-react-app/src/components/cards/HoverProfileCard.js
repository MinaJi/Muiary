import { Avatar } from "@mui/material";
import styled, { keyframes } from "styled-components";

const card = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1;}
`;

const Div = styled.div`
  float: right;
  display: inline;
  width: fit-content;
  &:hover > .card,
  &:active > .card {
    display: block;
  }
  .card {
    transform: translateX(20%) translateY(-10%);
    animation: ${card} 2.2s;
  }
  .top-div {
    background-color: ${(props) => props.theme.profileBgColor};
    padding: 15px;
    columns: 2 auto;
    display: flex;
    height: max-content;
  }
  .left-div {
    width: max-content;
    float: left;
    .avatar {
      width: 65px;
      height: 65px;
    }
  }
  .right-div {
    float: right;
    margin: 0;
    padding: 10px;
  }
  .name-div {
    margin-bottom: 15px;
    .nickname {
      font-weight: 600;
      margin-bottom: 3px;
    }
    .username {
      color: #5c5c5c;
    }
  }
  .bio {
    width: 200px;
    overflow: auto;
    max-height: 40px;
  }
  .center-div {
  }
  .contents-div {
    columns: 3 auto;
    display: flex;
    padding: 15px 0 15px 0;
    img {
      width: 105px;
    }
  }
  .bottom-div {
    padding-bottom: 15px;
    button {
      width: 100%;
    }
  }
`;

const Card = styled.div`
  font-size: 13px;
  display: none;
  width: max-content;
  height: max-content;
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  z-index: 200;
  box-shadow: 0px 0px 20px #00000033;
  overflow: hidden;
`;

export const HoverProfileCard = ({
  children,
  nickname,
  username,
  avatar,
  bio,
  followers,
  following,
  recentPosts,
}) => {
  return (
    <Div>
      {children}
      <Card className="card">
        <div className="top-div">
          <div className="left-div">
            <Avatar src={avatar} alt="avatar" className="avatar" />
          </div>
          <div className="right-div">
            <div className="name-div">
              <div className="nickname">
                <span>{nickname}</span>
              </div>
              <div className="username">
                <span>@{username}</span>
              </div>
            </div>
            <div className="bio">
              <span>{bio}</span>
            </div>
          </div>
        </div>
        <div className="center-div">
          팔로워 {followers} 팔로잉 {following}
        </div>
        <div className="contents-div">
          {recentPosts &&
            Object.keys(recentPosts).map((item, i) => (
              <img
                key={i}
                src={recentPosts[item].musicItem[0].artworkUrl100}
                alt="artwork"
              />
            ))}
        </div>
        <div className="bottom-div">
          <button>팔로우</button>
        </div>
      </Card>
    </Div>
  );
};
