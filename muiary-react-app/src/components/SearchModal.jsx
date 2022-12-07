import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000030;

  .modalContainer {
    background-color: #ffffff;
    width: 500px;
    height: 500px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .title {
    color: red;
    display: inline-block;
    text-align: center;
    margin-top: 10px;
  }
  .titleCloseBtn {
    display: flex;
    justify-content: flex-end;
  }
  .body {
    flex: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .btn {
    background-color: transparent;
    border: none;
    font-size: 25px;
    cursor: pointer;
  }
`;

const SearchBar = styled.input`
  background-color: transparent;
`;

function SearchModal({ closeModal }) {
  return (
    <ModalBackground>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)} className="btn">
            X
          </button>
        </div>
        <div className="title">
          <h1>Search</h1>
        </div>
        <div className="body">
          <SearchBar type="text" />
          <p>여기에는 검색결과</p>
        </div>
        <div className="footer">
          <button>확인</button>
        </div>
      </div>
    </ModalBackground>
  );
}

export default SearchModal;
