import { Grid } from "@mui/material";
import { Component } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SearchBarWrapper = styled(Grid)`
  && {
    .search-bar {
      background-color: ${(props) => props.theme.inputBg};
      border-radius: 10px;
      border: ${(props) => props.theme.inputBorder};
      height: 40px;
      width: 100%;
      padding: 10px;
      box-sizing: inherit;
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const OptionWrapper = styled(Grid)`
  && {
    .option-selector {
      color: ${(props) => props.theme.textColor};
      width: 100%;
      height: 40px;
      border: ${(props) => props.theme.inputBorder};
      border-radius: 10px;
      padding: 10px;
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='silver' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
        no-repeat ${(props) => props.theme.inputBg};
      background-position: calc(100% - 0.65rem) center;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      padding-right: 2rem;
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
        color: #f73859;
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
