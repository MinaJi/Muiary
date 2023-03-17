import React from "react";
import styled from "styled-components";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GridContainer = styled.div`
  width: 230px;
  position: relative;
  margin: 3px;
  padding: 5px 10px 10px 10px;
  .slick-list {
    flex: 1;
    height: 55px;
  }
  .circular-div {
    position: relative;
    display: inline-block;
    margin-top: 8px;
    .btn {
      top: -7px;
      left: 30px;
      position: absolute;
      background-color: #000;
      border-radius: 50%;
      border: none;
      width: 19px;
      height: 19px;
      justify-content: center;
      align-items: center;
      display: flex;
      border: 2px solid ${(props) => props.theme.bgColor};
      :hover {
        background-color: #f73859;
      }
      .remove-icon {
        font-size: 15px;
        color: #fff;
      }
    }
    .artwork {
      width: 45px;
      border-radius: 50%;
      cursor: pointer;
      :hover {
        filter: brightness(80%);
      }
    }
  }
`;

function SongDataList({ songData, setSongData, setIndexNum }) {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <KeyboardArrowRightRoundedIcon
        className={className}
        style={{ ...style, display: "block", color: "silver" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <KeyboardArrowLeftRoundedIcon
        className={className}
        style={{ ...style, display: "block", color: "silver" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow className="nextArrow" />,
    prevArrow: <SamplePrevArrow />,
  };
  const deleteHandler = (e, i) => {
    e.preventDefault();
    setSongData((songData) => {
      return songData.filter((_, index) => index !== i);
    });
  };

  const selectHandler = (e, i) => {
    e.preventDefault();
    setIndexNum(i);
  };

  return (
    <GridContainer>
      <Slider {...settings}>
        {songData.map((item, i) => (
          <div key={i}>
            <div className="circular-div">
              <img
                className="artwork"
                src={item.artworkUrl100}
                alt="artwork"
                onClick={(e) => selectHandler(e, i)}
              />
              <button onClick={(e) => deleteHandler(e, i)} className="btn">
                <RemoveIcon className="remove-icon" />
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </GridContainer>
  );
}

export default SongDataList;
