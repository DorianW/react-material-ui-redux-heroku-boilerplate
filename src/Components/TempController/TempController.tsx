import React from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";

import ArrowTop from "../../Images/Icons/arrowTop.svg";
import ArrowBottom from "../../Images/Icons/arrowBottom.svg";
import CloseSVG from "../../Images/Icons/close.svg";

import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

type IProps = {
  min: number;
  max: number;
  value: number;
  onIncrease?: any;
  onDecrease?: any;
  small?: boolean;
  onClose?: () => void;
  disableBackground?: boolean;
};

const Value = styled.p`
  font-size: 60px;
  font-weight: 400;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 25px;
  }
`;

const ArrwoTop = styled.img`
  display: inline-block;
  width: 40px;
  height: 48px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 25px;
    height: 25px;
  }
`;

const CloseIcon = styled.img`
  display: inline-block;
  width: 23px;
  height: 23px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 15px;
    height: 15px;
    top: 7px;
    right: 7px;
  }
`;

const ArrwoBottom = styled(ArrwoTop)``;

const TempController = ({
  min,
  max,
  value,
  onIncrease,
  onDecrease,
  small,
  onClose,
  disableBackground,
}: IProps) => {
  const ControllerWrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 213px;
    height: 200px;
    box-shadow: ${!disableBackground ? "3px 3px 7px #d06c1f" : "none"};
    border-radius: ${!disableBackground ? "10px" : "0px"};
    background-color: ${!disableBackground ? "#ffffff" : "none"};
    display: inline-block;
    text-align: center;
    @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
      width: ${small === true ? "100px" : "150px"};
      height: 130px;
    }
  `;

  return (
    <ControllerWrapper>
      <Box
        display="flex"
        style={{ height: "100%", position: "relative" }}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <div>
          <ArrwoTop
            src={ArrowTop}
            onClick={value < max ? onIncrease : () => {}}
            style={{
              cursor: value >= max ? "default" : "pointer",
              opacity: value >= max ? 0.3 : 1,
            }}
          ></ArrwoTop>
        </div>
        <div>
          <Value>{value === min ? "Aus" : `${value.toFixed(1)}°`}</Value>
        </div>
        <div>
          <ArrwoBottom
            src={ArrowBottom}
            onClick={value > min ? onDecrease : () => {}}
            style={{
              cursor: value <= min ? "default" : "pointer",
              opacity: value <= min ? 0.3 : 1,
            }}
          ></ArrwoBottom>
        </div>
        {onClose !== undefined && (
          <CloseIcon src={CloseSVG} onClick={onClose} />
        )}
      </Box>
    </ControllerWrapper>
  );
};

export default TempController;
