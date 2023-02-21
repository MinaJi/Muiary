import { Grid } from "@mui/material";
import { Component } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";

const SearchBarWrapper = styled(Grid)`
  && {
    .search-bar {
      background-color: ${(props) => props.theme.inputBg};
      border-radius: 10px;
      border: ${(props) => props.theme.inputBorder};
      height: 40px;
      width: 100%;
      padding-left: 10px;
      box-sizing: inherit;
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const OptionWrapper = styled(Grid)`
  && {
    .option-selector {
      background-color: ${(props) => props.theme.inputBg};
      color: ${(props) => props.theme.textColor};
      width: 100%;
      height: 40px;
      border: ${(props) => props.theme.inputBorder};
      border-radius: 10px;
    }
  }
`;

const BtnWrapper = styled(Grid)`
  && {
    .search-btn {
      height: 40px;
      background-color: ${(props) => props.theme.inputBg};
      border: ${(props) => props.theme.inputBorder};
      border-radius: 10px;
      font-size: 25px;
      .icon {
        margin-top: 5px;
      }
      :hover {
        background-color: #f73859;
        border: 1px solid #f73859;
      }
    }
  }
`;

const placeholderText = "Search songs, albums and artists... ";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchMedia: "all",
      searchedTerm: "",
    };

    this.onEnterPress = this.onEnterPress.bind(this);
  }

  handleSearchTextChange = (e) => this.setState({ searchText: e.target.value });

  handleSearchMediaChange = (e) =>
    this.setState({ searchMedia: e.target.value });

  onEnterPress = (e) => {
    if (e.keyCode === 13) {
      this.setState({ searchText: e.target.value });
      return this.props.startSearch(e.target.value);
    }
  };

  render() {
    const { searchText, searchMedia } = this.state;
    const { startSearch, mediaTypes } = this.props;

    const mediaOptions = mediaTypes.map((media) => (
      <option value={media} label={media} key={media} />
    ));

    return (
      <Grid container spacing={1}>
        <SearchBarWrapper item xs={8}>
          <input
            className="search-bar"
            value={searchText}
            placeholder={placeholderText}
            onKeyDown={this.onEnterPress.bind(this)}
            onChange={this.handleSearchTextChange}
          />
        </SearchBarWrapper>
        <OptionWrapper item xs={3}>
          <select
            className="option-selector"
            value={searchMedia}
            onChange={this.handleSearchMediaChange}
          >
            {mediaOptions}
          </select>
        </OptionWrapper>
        <BtnWrapper item xs={1}>
          <button
            className="search-btn"
            onClick={() => startSearch(searchText, searchMedia)}
          >
            <BiSearchAlt className="icon" />
          </button>
        </BtnWrapper>
      </Grid>
    );
  }
}

export default SearchBar;
