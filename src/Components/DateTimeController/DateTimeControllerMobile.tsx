import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Grid } from "@material-ui/core";
import moment from "moment";

import ArrowTop from "../../Images/Icons/arrowTop.svg";
import ArrowBottom from "../../Images/Icons/arrowBottom.svg";

type IProps = {
  time: string | undefined;
  date: string | undefined;
  onChangeTime: (value: string) => void;
  onChangeDate: (value: string) => void;
};

const Value = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin: 0;
  text-align: center;
`;

const ArrwoTop = styled.img`
  display: inline-block;
  width: 25px;
  height: 25px;
  margin: 0px 10px 0px 10px;
  cursor: pointer;
  padding: 0px;
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

  const containerStyle = {
    backgroundColor: "white",
    width: "150px",
    height: "130px",
    borderRadius: "10px",
    boxShadow: "3px 3px 7px #DED9D3",
  };

  return (
    <>
      <Grid container justify="center" style={{ padding: "0px 0px 0px 0px" }}>
        <Grid item style={{ ...containerStyle, marginRight: "20px" }}>
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
        <Grid item style={containerStyle}>
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
    </>
  );
};

export default DateTimeController;
