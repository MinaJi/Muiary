import React from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import moment from "moment";

const Div = styled.div`
  height: 320px;
  overflow-y: auto;
  padding: 10px;
`;

const SearchResultsList = ({ items, closeModal }) => {
  items.forEach((element) => {
    element.releaseDate = moment.utc(element.releaseDate).format("YYYY");
  });

  const itemsArray = items.map((item, index) => (
    <SearchItem key={index} {...item} searchData={item} closeModal={closeModal} />
  ));
  return <Div>{itemsArray}</Div>;
};

export default SearchResultsList;
