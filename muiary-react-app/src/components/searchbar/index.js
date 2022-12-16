import { Grid } from "@mui/material";
import { Component } from "react";
// import { mediaTypes } from "../config/api";
import { BiSearchAlt } from "react-icons/bi";

const placeholderText = "Search songs, albums and artists... ";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedTerm: "",
    };

    this.onEnterPress = this.onEnterPress.bind(this);
  }

  onEnterPress(e) {
    if (e.keyCode === 13) {
      this.state({
        searchedTerm: e.target.value,
      });
      return this.props.onSearchSubmit("?term=" + e.target.value);
    }
  }

  handleSearchTextChange = (e) => this.setState({ searchText: e.target.value });

  render() {
    const { searchText } = this.state;
    const { startSearch } = this.props;

    return (
      <>
        <Grid item xs={11}>
          <input
            className="searchBar"
            value={searchText}
            placeholder={placeholderText}
            onKeyDown={this.onEnterPress.bind(this)}
            onChange={this.handleSearchTextChange}
          />
        </Grid>
        <Grid item xs={1}>
          <button className="searchBtn" onClick={() => startSearch(searchText)}>
            <BiSearchAlt className="icon" />
          </button>
        </Grid>
      </>
    );
  }
}

export default SearchBar;
