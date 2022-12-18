import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";

// const GridContainer = styled(Grid)`
//   && {
//     .text {
//       font-size: 18px;
//     }
//   }
// `;

// const Img = styled.img`
//   width: 100px;
// `;

// function SearchResultsList() {
//   return (
//     <Grid container>
//       {list.map((item, idx) => (
//         <GridContainer container key={idx}>
//           <Grid item>
//             <Img src={item.url} alt="pics" />
//           </Grid>
//           <Grid item className="text">
//             <p>{item.name}</p>
//             <p>{item.album}</p>
//           </Grid>
//         </GridContainer>
//       ))}
//     </Grid>
//   );
// }

const Div = styled.div`
  height: 320px;
  overflow-y: auto;
  padding: 10px;
`;

const SearchResultsList = ({ items }) => {
  const itemsArray = items.map((item, index) => (
    <SearchItem key={index} {...item} />
  ));
  return <Div>{itemsArray}</Div>;
};

export default SearchResultsList;
