import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";

// const list = [
//   {
//     name: "meow",
//     album: "cat",
//     url: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
//   },
//   {
//     name: "cute",
//     album: "dog",
//     url: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
//   },
// ];

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

const SearchResultsList = ({ items }) => {
  const itemsArray = items.map((item, index) => (
    <SearchItem key={index} {...item} />
  ));
  return <div>{itemsArray}</div>;
};

export default SearchResultsList;
