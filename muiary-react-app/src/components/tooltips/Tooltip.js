import styled from "styled-components";

const Div = styled.div`
  float: right;
  cursor: pointer;
  display: inline;
  width: fit-content;
  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }
  .tooltip.top {
    transform: translateX(-50%) translateY(-200%);
  }
  .tooltip.bottom {
    transform: translateX(-50%) translateY(10%);
  }
  .tooltip.icon-bottom {
    transform: translateX(-30%) translateY(150%);
  }
`;

const Content = styled.div`
  font-size: 13px;
  font-weight: 500;
  display: none;
  text-align: center;
  color: white;
  width: max-content;
  max-width: 100%;
  background-color: #000000d9;
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  z-index: 200;
`;

export const Tooltip = ({ children, message, direction }) => {
  return (
    <Div>
      {children}
      <Content className={`tooltip ${direction || "top"}`}>{message}</Content>
    </Div>
  );
};
