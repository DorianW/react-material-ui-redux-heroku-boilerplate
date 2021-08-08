import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MAX_MOBILE_WIDTH } from "../../../Config/screenConfig";

type ConfigurationButtonProps = {
  display: string;
  url: string;
};

const ButtonContainer = styled.button`
  background: #ffffff;
  box-shadow: 3px 3px 7px #ded9d3;
  border-radius: 5px;
  height: 110px;
  width: 600px;
  border: none;
  font-size: 30px;
  color: #4b4b4b;
  cursor: pointer;
  :hover {
    color: white;
    background-color: #ff931e;
  }
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 18px;
    width: 310px;
    height: 80px;
  }
`;

const ConfigurationButton = ({ display, url }: ConfigurationButtonProps) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(url);
  };

  return <ButtonContainer onClick={handleClick}>{display}</ButtonContainer>;
};

export default ConfigurationButton;
