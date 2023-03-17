import React from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import moment from "moment";

const Div = styled.div`
  height: 315px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    background-color: transparent;
    width: 16px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c187;
    border: 4px solid transparent;
    border-radius: 20px;
    background-clip: padding-box;
  }
  padding: 10px;
`;

const SearchResultsList = ({ items, closeModal, setSongData }) => {
  items.forEach((element) => {
    element.releaseDate = moment.utc(element.releaseDate).format("YYYY");
  });

  const itemsArray = items.map((item, index) => (
    <SearchItem
      key={index}
      {...item}
      searchData={item}
      closeModal={closeModal}
      setSongData={setSongData}
    />
  ));
  return <Div>{itemsArray}</Div>;
};

export default SearchResultsList;
