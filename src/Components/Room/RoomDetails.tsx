import React, { useState, useEffect, useContext } from "react";
import { Grid, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { RoomActionTypes, Context } from "../../Store/Store";

import { NavigationStructure } from "../../Config/NavigationStructure";
import ViewInformation from "../ViewInformation/ViewInformation";
import { IRoom } from "../../Interfaces/Interfaces.js";
import StartEndController from "./StartEndController";
import TempController from "../TempController/TempController";
import TempControllerAdd from "../TempController/TempControllerAdd";
import TimeTempControllerAdd from "./TimeTempControllerAdd";
import ActionButtonOutlined from "../ActionButton/ActionButtonOutlined";
import moment from "moment";

import {
  MAX_MOBILE_WIDTH_HOOK,
  MAX_MOBILE_WIDTH,
} from "../../Config/screenConfig";

const containerStyle = {
  minHeight: "100vh",
};

interface IWeekDay {
  active?: boolean;
}

const WeekDay = styled.p`
  font-size: 40px;
  text-align: center;
  color: white;
  margin: 20px 0px 20px 0px;
  font-weight: 400;
  opacity: ${(props: IWeekDay) => (props.active == true ? 1 : 0.2)};
  cursor: pointer;
  padding: 0px 0px 0px 0px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 18px;
    font-weight: 700;
    padding: 0px 12px 0px 12px;
  }
`;

const FirstContentTitel = styled.p`
  font-size: 40px;
  display: "block";
  text-align: left;
  margin-bottom: 10px;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: 700;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    text-align: center;
    margin-bottom: 0px;
    font-size: 25px;
  }
`;

const SecondContentTitel = styled.p`
  font-size: 23px;
  color: #fff;
  font-weight: 700;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 16px;
  }
`;

const SecondContent = styled(SecondContentTitel)`
  font-weight: 400;
  max-width: 900px;
  margin-top: 0px;
  padding-bottom: 40px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    text-align: center;
    max-width: none;
  }
`;

const FirstContent = styled.p`
  font-size: 23px;
  display: inline-block;
  text-align: left;
  margin: 0;
  padding-left: 32px;
  padding-right: 32px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 16px;
    display: block;
    text-align: center;
  }
`;

const CurrentTemp = styled.p`
  font-size: 120px;
  font-weight: 200;
  margin: 0;
  padding-left: 32px;
  padding-right: 32px;
  text-align: left;
  padding-bottom: 0px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 80px;
    text-align: center;
    padding-bottom: 50px;
  }
`;

interface IProps {
  roomId: string;
}

const RoomDetails = () => {
  const history = useHistory();
  const params: IProps = useParams();
  const { roomId } = params;
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });
  const { state, dispatch } = useContext(Context);
  const data = [...state.rooms];

  const [activeData, setActiveData] = useState<IRoom | null>(null);
  const [activeDay, setActiveDay] = useState<number>(0);
  const [enableAddRule, setEnableAddRule] = useState<boolean>(true);
  const [isShowConfirmation, setIsShowConfirmation] = useState<boolean>(false);
  const [indexToDelete, setIndexToDelete] = useState<number>(0);

  const handleClose = () => {
    setIsShowConfirmation(false);
  };

  const handleOpen = (index: number) => {
    setIndexToDelete(index);
    setIsShowConfirmation(true);
  };

  const onConfirmation = () => {
    onDeleteSetting(activeDay, indexToDelete);
    setIsShowConfirmation(false);
  };

  useEffect(() => {
    const roomIdNumber = parseInt(roomId);
    const copy = [...data];
    const currentData = copy.filter((room) => room.id === roomIdNumber);

    if (currentData.length == 1) {
      setActiveData(JSON.parse(JSON.stringify(currentData[0])));
    } else {
      alert("Einstellung nicht gefunden...");
    }
  }, [roomId]);

  const addNewSetting = (weekDay: number, objectToUpdate: IRoom): IRoom => {
    const updatedData: IRoom = { ...objectToUpdate };
    const newSetting = {
      id: 1,
      temp: 20,
      start: "8:00",
      end: "18:00",
    };

    if (!!updatedData.settings?.[weekDay]) {
      if (updatedData.settings?.[weekDay].length == 0) {
        const result = updatedData.settings?.[weekDay].push(newSetting);
      } else {
        const currentLength = updatedData.settings?.[weekDay].length;
        const lastEnd = updatedData.settings?.[weekDay][currentLength - 1]?.end;
        const lastTemp =
          updatedData.settings?.[weekDay][currentLength - 1].temp;

        const newEnd = moment(lastEnd, "HH:mm").add(1, "hour");

        const result = updatedData.settings?.[weekDay].push({
          id: currentLength + 1,
          start: lastEnd,
          end: newEnd.format("HH:mm"),
          temp: lastTemp,
        });
      }
    } else {
      if (!!updatedData.settings) {
        updatedData.settings[weekDay] = [];
        updatedData.settings[weekDay].push(newSetting);
      }
    }
    return updatedData;
  };

  const handleAddSetting = () => {
    if (activeData != null) {
      const newData = addNewSetting(activeDay, { ...activeData });
      setActiveData(newData);
    }
  };

  const onDeleteSetting = (activeDay: number, index: number) => {
    if (activeData != null && activeData.settings !== undefined) {
      activeData.settings[activeDay].splice(index, 1);
      setActiveData({ ...activeData });
    }
  };

  const changeTemp = (weekDay: number, index: number, step: number) => {
    if (activeData != null) {
      const updatedData: IRoom = { ...activeData };
      if (
        typeof updatedData?.settings != "undefined" &&
        !!updatedData?.settings[weekDay][index]
      ) {
        const currentTemp = updatedData.settings[weekDay][index].temp;
        updatedData.settings[weekDay][index].temp = currentTemp + step;
      }
      setActiveData({ ...updatedData });
    }
  };

  const changeStartTime = (value: string, weekDay: number, index: number) => {
    if (activeData != null) {
      const updatedData: IRoom = { ...activeData };
      if (
        typeof updatedData?.settings != "undefined" &&
        !!updatedData?.settings[weekDay][index]
      ) {
        updatedData.settings[weekDay][index].start = value;
      }
      setActiveData({ ...updatedData });
    }
  };

  const changeEndTime = (value: string, weekDay: number, index: number) => {
    if (activeData != null) {
      const updatedData: IRoom = { ...activeData };
      if (
        typeof updatedData?.settings != "undefined" &&
        !!updatedData?.settings[weekDay][index]
      ) {
        const newTime = moment(value, "HH:mm");
        updatedData.settings[weekDay][index].end = value;
        if (
          updatedData.settings[weekDay][index + 1] &&
          updatedData.settings[weekDay][index + 1]?.end
        ) {
          const oldEndTime = moment(
            updatedData.settings[weekDay][index + 1].end,
            "HH:mm"
          );
          updatedData.settings[weekDay][index + 1].start = value;
        }
      }
      setActiveData({ ...updatedData });
    }
  };

  const renderWeekDays = () => {
    const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    return days.map((day, index) => (
      <Grid item key={index}>
        <WeekDay
          active={activeDay == index}
          onClick={() => setActiveDay(index)}
        >
          {day}
        </WeekDay>
      </Grid>
    ));
  };

  const handleSave = () => {
    if (activeData != null) {
      dispatch({
        type: RoomActionTypes.UPDATE_ROOM,
        payload: { ...activeData },
      });
      history.push(NavigationStructure.home.url);
    }
  };

  const getPreviousEndTime = (index: number): string | null => {
    if (
      typeof activeData?.settings?.[activeDay] != "undefined" &&
      activeData?.settings?.[activeDay].length >= 2 &&
      index >= 1
    ) {
      return activeData.settings[activeDay][index - 1].end;
    }
    return null;
  };

  const getMaxEndTime = (index: number): string | null => {
    if (
      typeof activeData?.settings?.[activeDay] != "undefined" &&
      activeData?.settings?.[activeDay].length > 2 &&
      index == activeData?.settings?.[activeDay].length - 1
    ) {
      return activeData.settings[activeDay][0].start;
    }
    return null;
  };

  useEffect(() => {
    if (
      typeof activeData?.settings?.[activeDay] != "undefined" &&
      activeData?.settings?.[activeDay].length > 0
    ) {
      const length = activeData.settings[activeDay].length;
      const start = activeData.settings[activeDay][0].start;
      const end = activeData.settings[activeDay][length - 1].end;
      if (start == end) {
        setEnableAddRule(false);
      } else {
        setEnableAddRule(true);
      }
    }
  }, [activeData]);

  return (
    <>
      <Grid container style={containerStyle}>
        <Grid item xs={12} lg={4}>
          <ViewInformation
            pageName={NavigationStructure.roomSettings.display}
            full
          />
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} style={{ maxWidth: "600px" }}>
              <FirstContentTitel>{activeData?.name}</FirstContentTitel>
              <FirstContent>aktuelle Temperatur</FirstContent>
              <CurrentTemp>{activeData?.temp}°C</CurrentTemp>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={1} style={{ backgroundColor: "#F97F21" }}>
          <Grid
            container
            direction={isMobile ? "row" : "column"}
            justify="center"
            style={{
              padding: "40px 0px 40px 0px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {renderWeekDays()}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7} style={{ backgroundColor: "#FD931E" }}>
          <Grid
            container
            direction="column"
            justify="center"
            style={{
              padding: isMobile ? "30px 20px 0px 20px" : "40px 0px 60px 60px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <SecondContentTitel>Zeitplan</SecondContentTitel>
            <SecondContent>
              Legen Sie fest, an welchem Wochentag und zu welcher Uhrzeit die
              Tages- und Nachttemperaturen gelten sollen.
            </SecondContent>
            {activeData?.settings?.[activeDay]?.map((setting, index) => {
              return (
                <Grid
                  container
                  spacing={1}
                  justify={isMobile ? "center" : "flex-start"}
                  key={`${activeDay}_${setting.id}`}
                  style={{
                    marginBottom: isMobile ? "8px" : "12px",
                  }}
                >
                  <Grid
                    container
                    style={{
                      boxShadow: "3px 3px 7px #d06c1f",
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      maxWidth: isMobile ? "308px" : "710px",
                    }}
                  >
                    <Grid item>
                      <StartEndController
                        startTime={setting.start}
                        endTime={setting.end}
                        onChangeStartTime={(value) => {
                          changeStartTime(value, activeDay, index);
                        }}
                        onChangeEndTime={(value) => {
                          changeEndTime(value, activeDay, index);
                        }}
                        disableDecreaseEnd={false}
                        disableDecreaseStart={false}
                        disableIncreaseEnd={false}
                        disableIncreaseStart={false}
                        minStartTime={getPreviousEndTime(index)}
                        maxEndTime={getMaxEndTime(index)}
                      />
                    </Grid>
                    <Grid item>
                      <TempController
                        min={14}
                        max={26}
                        value={setting.temp}
                        onIncrease={() => changeTemp(activeDay, index, 0.5)}
                        onDecrease={() => changeTemp(activeDay, index, -0.5)}
                        small
                        onClose={() => {
                          handleOpen(index);
                        }}
                        disableBackground={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            {((!!activeData?.settings?.[activeDay] &&
              activeData?.settings?.[activeDay]?.length < 4) ||
              typeof activeData?.settings?.[activeDay] == "undefined") &&
              enableAddRule && (
                <Grid
                  container
                  spacing={1}
                  style={{ paddingBottom: "8px" }}
                  justify={isMobile ? "center" : "flex-start"}
                  onClick={handleAddSetting}
                >
                  <Grid
                    container
                    style={{
                      boxShadow: "3px 3px 7px #d06c1f",
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      maxWidth: isMobile ? "308px" : "710px",
                    }}
                  >
                    <Grid item>
                      <TimeTempControllerAdd />
                    </Grid>
                    <Grid item>
                      <TempControllerAdd />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            <Grid
              container
              style={{
                paddingTop: isMobile ? "30px" : "60px",
                paddingBottom: "40px",
              }}
              justify={isMobile ? "center" : "flex-start"}
            >
              <Grid item style={{ paddingRight: "25px" }}>
                <ActionButtonOutlined variant="save" onClick={handleSave} />
              </Grid>
              <Grid item>
                <ActionButtonOutlined
                  variant="cancel"
                  onClick={() => {
                    history.push(NavigationStructure.home.url);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={isShowConfirmation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Wollen Sie die Regel wirklich löschen?
        </DialogTitle>
        <DialogActions>
          <ActionButtonOutlined
            onClick={onConfirmation}
            variant="delete"
            background="#F97F21"
          />
          <ActionButtonOutlined
            onClick={handleClose}
            variant="cancel"
            background="#F97F21"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoomDetails;
