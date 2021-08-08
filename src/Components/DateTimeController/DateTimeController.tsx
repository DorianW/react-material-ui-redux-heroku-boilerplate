import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Grid } from "@material-ui/core";
import moment from "moment";

import ArrowTop from "../../Images/Icons/arrowTop.svg";
import ArrowBottom from "../../Images/Icons/arrowBottom.svg";

import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

type IProps = {
  time: string | undefined;
  date: string | undefined;
  onChangeTime: (value: string) => void;
  onChangeDate: (value: string) => void;
};

const ControllerWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 600px;
  height: 200px;
  box-shadow: 3px 3px 7px #d06c1f;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
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

const DateTimeController = ({
  time,
  onChangeTime,
  date,
  onChangeDate,
}: IProps) => {
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");

  const [day, setDay] = useState<string>("01");
  const [month, setMonth] = useState<string>("01");
  const [year, setYear] = useState<string>("2021");

  const getRealDate = (): moment.Moment => {
    if (typeof time != "undefined" && typeof date != "undefined") {
      return moment(`${date}T${time}`, "DD.MM.YYYYTHH:mm");
    } else {
      return moment("01.01.2021T00:00", "DD.MM.YYYYTHH:mm");
    }
  };

  useEffect(() => {
    try {
      if (typeof time != "undefined" && typeof date != "undefined") {
        const realDate = getRealDate();
        setHours(realDate.format("HH"));
        setMinutes(realDate.format("mm"));
        setDay(realDate.format("DD"));
        setMonth(realDate.format("MM"));
        setYear(realDate.format("YYYY"));
      }
    } catch {
      console.error("Error in parsing value to hours/minutes");
    }
  }, [time, date]);

  const handleAddHours = () => {
    const realDate = getRealDate();
    onChangeTime(realDate.add(1, "hour").format("HH:mm"));
  };

  const handleAddMinutes = () => {
    const realDate = getRealDate();
    onChangeTime(realDate.add(15, "minutes").format("HH:mm"));
  };

  const handleRemoveHours = () => {
    const realDate = getRealDate();
    onChangeTime(realDate.add(-1, "hour").format("HH:mm"));
  };

  const handleRemoveMinutes = () => {
    const realDate = getRealDate();
    onChangeTime(realDate.add(-15, "minutes").format("HH:mm"));
  };

  const handleAddDay = () => {
    const realDate = getRealDate();
    onChangeDate(realDate.add(1, "day").format("DD.MM.YYYY"));
  };

  const handleAddMonth = () => {
    const realDate = getRealDate();
    onChangeDate(realDate.add(1, "month").format("DD.MM.YYYY"));
  };

  const handleAddYear = () => {
    if (year != "2099") {
      const realDate = getRealDate();
      onChangeDate(realDate.add(1, "year").format("DD.MM.YYYY"));
    }
  };

  const handleRemoveDay = () => {
    const realDate = getRealDate();
    onChangeDate(realDate.add(-1, "day").format("DD.MM.YYYY"));
  };

  const handleRemoveMonth = () => {
    const realDate = getRealDate();
    onChangeDate(realDate.add(-1, "month").format("DD.MM.YYYY"));
  };

  const handleRemoveYear = () => {
    if (year != "2021") {
      const realDate = getRealDate();
      onChangeDate(realDate.add(-1, "year").format("DD.MM.YYYY"));
    }
  };

  return (
    <ControllerWrapper>
      <Grid
        container
        justify="space-between"
        style={{ padding: "0px 40px 0px 40px" }}
      >
        <Grid item>
          <Box
            display="flex"
            style={{ height: "100%" }}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div>
              <div>
                <ArrwoTop src={ArrowTop} onClick={handleAddDay}></ArrwoTop>
                <ArrwoTop src={ArrowTop} onClick={handleAddMonth}></ArrwoTop>
                <ArrwoTop src={ArrowTop} onClick={handleAddYear}></ArrwoTop>
              </div>
              <Value>
                {day}.{month}.{parseInt(year) % 2000}
              </Value>
              <div>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={handleRemoveDay}
                ></ArrwoBottom>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={handleRemoveMonth}
                ></ArrwoBottom>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={handleRemoveYear}
                ></ArrwoBottom>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            style={{ height: "100%" }}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div>
              <div>
                <ArrwoTop src={ArrowTop} onClick={handleAddHours}></ArrwoTop>
                <ArrwoTop src={ArrowTop} onClick={handleAddMinutes}></ArrwoTop>
              </div>
              <Value>
                {hours}:{minutes}
              </Value>
              <div>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={handleRemoveHours}
                ></ArrwoBottom>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={handleRemoveMinutes}
                ></ArrwoBottom>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ControllerWrapper>
  );
};

export default DateTimeController;
