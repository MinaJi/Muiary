import React from "react";
import styled from "styled-components";
import SearchResultList from "../components/SearchResultsList";
import { MdClose } from "react-icons/md";
import { Grid } from "@mui/material";
import SearchBar from "./searchbar";
import { itunesApiRequest, mediaTypes } from "../apis/api";
import NoResults from "./NoResults";
import { Component } from "react";
import { useEffect } from "react";

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000030;
`;

const ModalContainer = styled(Grid)`
  && {
    background-color: #ffffff;
    width: 600px;
    height: 500px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    box-shadow: rgba(97, 97, 97, 0.35) 0px 5px 15px;
    .title {
      color: #000000;
      font-weight: 600;
    }
    .titleCloseBtn {
      display: flex;
      justify-content: flex-end;
    }
    .btn {
      background-color: transparent;
      border: none;
      font-size: 30px;
      cursor: pointer;
      :hover {
        color: #f73859;
      }
    }
    .searchResults {
      margin-top: 20px;
      width: 100%;
      border: 1px solid lightgray;
      border-radius: 10px;
    }
  }
`;

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
    this.updateSearch = this.updateSearch.bind(this);
  }

  async updateSearch(text, media) {
    const response = await itunesApiRequest(text, media);
    // console.log(response.results[0].releaseDate);
    this.setState({ searchResults: response.results });
  }

  // async updateSearch(text, media) {
  //   const response = await itunesApiRequest(text, media);
  //   const artWorkUrl = response.results[].artworkUrl100;
  //   this.setState({ searchResults: response.results });
  //   console.log("주소" + artWorkUrl);
  //   console.log("데이터?" + response.results[0].artworkUrl100);
  // }

  render() {
    const { searchResults } = this.state;
    const closeModal = this.props.closeModal;

    // const dateFormat = (id, releaseDate) => {
    //   searchResults.map(()=>({
    //     releaseDate: "2022"
    //   }))
    // }

    // useEffect(() => {
    //   searchResults.map(() => ({
    //     releaseDate: "2022",
    //   }));
    // });

    return (
      <ModalBackground>
        <ModalContainer container>
          <Grid container className="title">
            <Grid item xs={11}>
              <h1>Search</h1>
            </Grid>
            <Grid item xs={1} className="titleCloseBtn">
              <button
                onClick={(e) => {
                  closeModal(false);
                }}
                className="btn"
              >
                <MdClose />
              </button>
            </Grid>
          </Grid>
          <Grid
            container
            className="search"
            justifyContent="space-between"
            spacing={2}
          >
            <SearchBar
              mediaTypes={mediaTypes}
              startSearch={this.updateSearch}
            />
          </Grid>
          <Grid item className="searchResults">
            <SearchResultList items={searchResults} />
          </Grid>
        </ModalContainer>
      </ModalBackground>
    );
  }
}

export default SearchModal;
