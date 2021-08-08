import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import moment from "moment";

import ArrowTop from "../../Images/Icons/arrowTop.svg";
import ArrowBottom from "../../Images/Icons/arrowBottom.svg";

import {
  MAX_MOBILE_WIDTH_HOOK,
  MAX_MOBILE_WIDTH,
} from "../../Config/screenConfig";

type IProps = {
  startTime: string;
  endTime: string;
  onChangeStartTime: (value: string) => void;
  onChangeEndTime: (value: string) => void;
  disableIncreaseStart: boolean;
  disableIncreaseEnd: boolean;
  disableDecreaseStart: boolean;
  disableDecreaseEnd: boolean;
  minStartTime: string | null;
  maxEndTime: string | null;
};

const ControllerWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 480px;
  height: 200px;
  display: flex;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 200px;
    height: 130px;
  }
`;

const Value = styled.p`
  font-size: 60px;
  font-weight: 400;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 25px;
  }
`;

const Divider = styled.p`
  font-size: 60px;
  font-weight: 400;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 25px;
  }
`;

interface IArrowProps {
  readonly isDisabled?: boolean;
}

const ArrwoTop = styled.img<IArrowProps>`
  display: inline-block;
  width: 40px;
  height: 48px;
  margin: 0px 20px 0px 20px;
  padding: 0px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 25px;
    height: 25px;
    margin: 0px 5px 0px 5px;
  }
  opacity: ${(props) => (props.isDisabled ? 0.3 : 1)};
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
`;

const ArrwoBottom = styled(ArrwoTop)``;

const StartEndController = ({
  startTime,
  onChangeStartTime,
  endTime,
  onChangeEndTime,
  disableIncreaseStart,
  disableIncreaseEnd,
  disableDecreaseStart,
  disableDecreaseEnd,
  minStartTime,
  maxEndTime,
}: IProps) => {
  const [startTimeMoment, setStartTimeMoment] = useState<moment.Moment>(
    moment(startTime, "HH:mm")
  );

  const [endTimeMoment, setEndTimeMoment] = useState<moment.Moment>(
    moment(endTime, "HH:mm")
  );

  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });

  const [canDecreaseEnd, setCanDecreaseEnd] = useState<boolean>(true);
  const [canIncreaseEnd, setCanIncreaseEnd] = useState<boolean>(true);
  const [canIncreaseStart, setCanIncreaseStart] = useState<boolean>(true);
  const [canDecreaseStart, setCanDecreaseStart] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (typeof startTime != "undefined") {
        setStartTimeMoment(moment(startTime, "HH:mm"));
      }

      if (typeof endTime != "undefined") {
        setEndTimeMoment(moment(endTime, "HH:mm"));
      }
    } catch {
      console.error("Error in parsing value to hours/minutes");
    }
  }, [startTime, endTime]);

  useEffect(() => {
    onChangeStartTime(startTimeMoment.format("HH:mm"));
    if (startTimeMoment.isSame(endTimeMoment)) {
      setCanIncreaseStart(false);
    } else {
      setCanIncreaseStart(true);
    }

    if (
      startTimeMoment.isSame(moment("00:00", "HH:mm")) ||
      startTimeMoment.isSame(moment(minStartTime, "HH:mm"))
    ) {
      setCanDecreaseStart(false);
    } else {
      setCanDecreaseStart(true);
    }
  }, [startTimeMoment]);

  useEffect(() => {
    onChangeEndTime(endTimeMoment.format("HH:mm"));
    if (endTimeMoment.isSame(startTimeMoment)) {
      setCanDecreaseEnd(false);
    } else {
      setCanDecreaseEnd(true);
    }

    if (
      (endTimeMoment.isSame(moment("00:00", "HH:mm")) &&
        !startTimeMoment.isSame(moment("00:00", "HH:mm"))) ||
      endTimeMoment.isSame(moment(maxEndTime, "HH:mm"))
    ) {
      setCanIncreaseEnd(false);
    } else {
      setCanIncreaseEnd(true);
    }
  }, [endTimeMoment]);

  const handleIncreaseStartHours = () => {
    const newResult = moment(
      startTimeMoment.clone().add(1, "hours").format("HH:mm"),
      "HH:mm"
    );
    if (
      endTimeMoment.isSameOrBefore(newResult) &&
      !endTimeMoment.isSame(moment("00:00", "HH:mm"))
    ) {
      setStartTimeMoment(endTimeMoment);
    } else {
      setStartTimeMoment(newResult);
    }
  };

  const handleIncreaseEndHours = () => {
    const newResult = moment(
      endTimeMoment.clone().add(1, "hours").format("HH:mm"),
      "HH:mm"
    );
    const maxTime = moment(maxEndTime, "HH:mm");

    if (endTimeMoment.isSameOrAfter(newResult)) {
      setEndTimeMoment(moment("00:00", "HH:mm"));
    } else {
      if (!!maxTime && newResult.isAfter(maxTime)) {
        setEndTimeMoment(maxTime);
      } else {
        setEndTimeMoment(newResult);
      }
    }
  };

  const handleIncreaseStartMinutes = () => {
    const newResult = moment(
      startTimeMoment.clone().add(15, "minutes").format("HH:mm"),
      "HH:mm"
    );
    if (
      endTimeMoment.isSameOrBefore(newResult) &&
      !endTimeMoment.isSame(moment("00:00", "HH:mm"))
    ) {
      setStartTimeMoment(endTimeMoment);
    } else {
      setStartTimeMoment(newResult);
    }
  };

  const handleIncreaseEndMinutes = () => {
    const newResult = moment(
      endTimeMoment.clone().add(15, "minutes").format("HH:mm"),
      "HH:mm"
    );
    const maxTime = moment(maxEndTime, "HH:mm");

    if (endTimeMoment.isSameOrAfter(newResult)) {
      setEndTimeMoment(moment("00:00", "HH:mm"));
    } else {
      if (!!maxTime && newResult.isAfter(moment(maxEndTime, "HH:mm"))) {
        setEndTimeMoment(maxTime);
      } else {
        setEndTimeMoment(newResult);
      }
    }
  };

  const handleDecreaseStartHours = () => {
    const newResult = moment(
      startTimeMoment.clone().add(-1, "hours").format("HH:mm"),
      "HH:mm"
    );
    const minTime = moment(minStartTime, "HH:mm");
    if (
      newResult.isSameOrAfter(endTimeMoment) &&
      !endTimeMoment.isSame(moment("00:00", "HH:mm"))
    ) {
      setStartTimeMoment(moment("00:00", "HH:mm"));
    } else {
      if (!!minStartTime && newResult.isBefore(minTime)) {
        setStartTimeMoment(minTime);
      } else {
        setStartTimeMoment(newResult);
      }
    }
  };

  const handleDecreaseEndHours = () => {
    const newResult = moment(
      endTimeMoment.clone().add(-1, "hours").format("HH:mm"),
      "HH:mm"
    );
    if (startTimeMoment.isBefore(newResult)) {
      setEndTimeMoment(newResult);
    } else {
      setEndTimeMoment(startTimeMoment);
    }
  };

  const handleDecreaseStartMinutes = () => {
    const newResult = moment(
      startTimeMoment.clone().add(-15, "minutes").format("HH:mm"),
      "HH:mm"
    );
    const minTime = moment(minStartTime, "HH:mm");
    if (
      newResult.isSameOrAfter(endTimeMoment) &&
      !endTimeMoment.isSame(moment("00:00", "HH:mm"))
    ) {
      setStartTimeMoment(moment("00:00", "HH:mm"));
    } else {
      if (!!minStartTime && newResult.isBefore(minTime)) {
        setStartTimeMoment(minTime);
      } else {
        setStartTimeMoment(newResult);
      }
    }
  };

  const handleDecreaseEndMinutes = () => {
    const newResult = moment(
      endTimeMoment.clone().add(-15, "minutes").format("HH:mm"),
      "HH:mm"
    );
    if (startTimeMoment.isBefore(newResult)) {
      setEndTimeMoment(newResult);
    } else {
      setEndTimeMoment(startTimeMoment);
    }
  };

  return (
    <ControllerWrapper>
      <Grid
        container
        justify="space-between"
        style={{
          padding: isMobile ? "0px 10px 0px 10px" : "0px 40px 0px 40px",
        }}
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
                <ArrwoTop
                  src={ArrowTop}
                  onClick={
                    disableIncreaseStart || !canIncreaseStart
                      ? () => {}
                      : handleIncreaseStartHours
                  }
                  isDisabled={disableIncreaseStart || !canIncreaseStart}
                ></ArrwoTop>
                <ArrwoTop
                  src={ArrowTop}
                  onClick={
                    disableIncreaseStart || !canIncreaseStart
                      ? () => {}
                      : handleIncreaseStartMinutes
                  }
                  isDisabled={disableIncreaseStart || !canIncreaseStart}
                ></ArrwoTop>
              </div>
              <Value>{startTimeMoment.format("HH:mm")}</Value>
              <div>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={
                    disableDecreaseStart || !canDecreaseStart
                      ? () => {}
                      : handleDecreaseStartHours
                  }
                  isDisabled={disableDecreaseStart || !canDecreaseStart}
                ></ArrwoBottom>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={
                    disableDecreaseStart || !canDecreaseStart
                      ? () => {}
                      : handleDecreaseStartMinutes
                  }
                  isDisabled={disableDecreaseStart || !canDecreaseStart}
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
            <Divider>-</Divider>
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
                <ArrwoTop
                  src={ArrowTop}
                  onClick={
                    disableIncreaseEnd || !canIncreaseEnd
                      ? () => {}
                      : handleIncreaseEndHours
                  }
                  isDisabled={disableIncreaseEnd || !canIncreaseEnd}
                ></ArrwoTop>
                <ArrwoTop
                  src={ArrowTop}
                  onClick={
                    disableIncreaseEnd || !canIncreaseEnd
                      ? () => {}
                      : handleIncreaseEndMinutes
                  }
                  isDisabled={disableIncreaseEnd || !canIncreaseEnd}
                ></ArrwoTop>
              </div>
              <Value>{endTimeMoment.format("HH:mm")}</Value>
              <div>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={
                    disableDecreaseEnd || !canDecreaseEnd
                      ? () => {}
                      : handleDecreaseEndHours
                  }
                  isDisabled={disableDecreaseEnd || !canDecreaseEnd}
                ></ArrwoBottom>
                <ArrwoBottom
                  src={ArrowBottom}
                  onClick={
                    disableDecreaseEnd || !canDecreaseEnd
                      ? () => {}
                      : handleDecreaseEndMinutes
                  }
                  isDisabled={disableDecreaseEnd || !canDecreaseEnd}
                ></ArrwoBottom>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ControllerWrapper>
  );
};

export default StartEndController;
