import React from "react";
import styled from "styled-components";
import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

type ConfigurationButtonProps = {
  selected: boolean;
  label: string | undefined;
  id: number | undefined;
  onClick: (id: number | undefined) => void;
};

const RoomButton = ({
  selected,
  label,
  id,
  onClick,
}: ConfigurationButtonProps) => {
  const ButtonContainer = styled.button`
    background-color: ${selected ? "#FF931E" : "white"};
    border-radius: 5px;
    height: 100px;
    width: 300px;
    border: none;
    font-size: 30px;
    color: ${selected ? "white" : "#4b4b4b"};
    box-shadow: ${selected ? "none" : "5px 5px 10px #00000029"};
    cursor: pointer;
    @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
      font-size: 14px;
      width: 150px;
      height: 45px;
    }
  `;

  return (
    <ButtonContainer key={id} onClick={() => onClick(id)}>
      {label}
    </ButtonContainer>
  );
};

export default RoomButton;
