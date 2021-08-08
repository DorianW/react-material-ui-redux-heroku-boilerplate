import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";

import ArrowTop from "../../Images/Icons/arrowTop.svg";
import ArrowBottom from "../../Images/Icons/arrowBottom.svg";

import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

type IProps = {
  value: string;
  onChangeValue: (value: string) => void;
};

const ControllerWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 300px;
  height: 200px;
  box-shadow: 3px 3px 7px #d06c1f;
  border-radius: 10px;
  background-color: #fff;
  display: inline-block;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 150px;
    height: 130px;
  }
`;

const Value = styled.p`
  font-size: 60px;
  font-weight: 400;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 30px;
  }
`;

const ArrwoTop = styled.img`
  display: inline-block;
  width: 40px;
  height: 48px;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
  padding: 0px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 25px;
    height: 25px;
    margin: 0px 10px 0px 10px;
  }
`;

const ArrwoBottom = styled(ArrwoTop)``;

const numberToString = (number: number): string => {
  if (number <= 9) return `0${number}`;
  return number.toString();
};

//TODO introduce moment
const TimeController = ({ value, onChangeValue }: IProps) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  useEffect(() => {
    try {
      setHours(parseInt(value.split(":")[0]));
      setMinutes(parseInt(value.split(":")[1]));
    } catch {
      console.error("Error in parsing value to hours/minutes");
    }
  }, [value]);

  const handleIncreateHours = () => {
    if (hours >= 23) {
      onChangeValue(`${numberToString(0)}:${numberToString(minutes)}`);
    } else {
      onChangeValue(`${numberToString(hours + 1)}:${numberToString(minutes)}`);
    }
  };

  const handleIncreateMinutes = () => {
    if (minutes >= 45) {
      onChangeValue(`${numberToString(hours)}:${numberToString(0)}`);
    } else {
      onChangeValue(`${numberToString(hours)}:${numberToString(minutes + 15)}`);
    }
  };

  const handleDecreaseHours = () => {
    if (hours == 0) {
      onChangeValue(`${numberToString(23)}:${numberToString(minutes)}`);
    } else {
      onChangeValue(`${numberToString(hours - 1)}:${numberToString(minutes)}`);
    }
  };

  const handleDecreaseMinutes = () => {
    if (minutes == 0) {
      onChangeValue(`${numberToString(hours)}:${numberToString(45)}`);
    } else {
      onChangeValue(`${numberToString(hours)}:${numberToString(minutes - 15)}`);
    }
  };

  return (
    <ControllerWrapper>
      <Box
        display="flex"
        style={{ height: "100%" }}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <div>
          <ArrwoTop src={ArrowTop} onClick={handleIncreateHours}></ArrwoTop>
          <ArrwoTop src={ArrowTop} onClick={handleIncreateMinutes}></ArrwoTop>
        </div>
        <Value>
          {numberToString(hours)}:{numberToString(minutes)}
        </Value>
        <div>
          <ArrwoBottom
            src={ArrowBottom}
            onClick={handleDecreaseHours}
          ></ArrwoBottom>
          <ArrwoBottom
            src={ArrowBottom}
            onClick={handleDecreaseMinutes}
          ></ArrwoBottom>
        </div>
      </Box>
    </ControllerWrapper>
  );
};

export default TimeController;
