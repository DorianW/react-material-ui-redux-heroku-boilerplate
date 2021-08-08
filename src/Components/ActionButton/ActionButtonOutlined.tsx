import React from "react";
import styled from "styled-components";
import CancelSVG from "./cancel.svg";
import SaveSVG from "./save.svg";
import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

type IProps = {
  variant: "cancel" | "save" | "delete" | "ok";
  onClick: () => void;
  background?: string;
};

const Button = styled.button`
  display: flex;
  background: transparent;
  box-shadow: none;
  border-radius: 30px;
  height: 60px;
  width: 200px;
  border: 2px solid white;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  :hover {
  }
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    height: 45px;
    width: 130px;
  }
`;

const Icon = styled.img`
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 15px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }
`;

const Text = styled.p`
  margin: 0px;
  display: inline-block;
  color: white;
  font-size: 20px;
  font-weight: 400;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 14px;
  }
`;

const getLabel = (variant: "cancel" | "save" | "delete" | "ok"): string => {
  switch (variant) {
    case "cancel":
      return "Abbrechen";
    case "save":
      return "Speichern";
    case "delete":
      return "Löschen";
    default:
      return "ok";
  }
};

const ActionButtonOutlined = ({ variant, onClick, background }: IProps) => {
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: !!background ? background : "none" }}
    >
      <Icon
        src={
          variant == "save" || variant == "delete" || variant == "ok"
            ? SaveSVG
            : CancelSVG
        }
      />
      <Text>{getLabel(variant)}</Text>
    </Button>
  );
};

export default ActionButtonOutlined;
