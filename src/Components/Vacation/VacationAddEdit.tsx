import React, { useState, useEffect, useContext } from "react";
import { Grid, Box } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";

import { NavigationStructure } from "../../Config/NavigationStructure";
import ViewInformation from "../ViewInformation/ViewInformation";
import CustomSlider from "../CustomSlider/CustomSlider";
import TempController from "../TempController/TempController";
import { Context, VacationActionTypes } from "../../Store/Store";

import { IVacationData } from "../../Interfaces/Interfaces";
import VacationStartSVG from "../../Images/Icons/vacationStartWhite.svg";
import VacationEndSVG from "../../Images/Icons/vacationEndWhite.svg";

import DateTimeController from "../DateTimeController/DateTimeController";
import DateTimeControllerMobile from "../DateTimeController/DateTimeControllerMobile";

import ActionButtonOutlined from "../ActionButton/ActionButtonOutlined";
import RoomButton from "./RoomButton";
import { MAX_MOBILE_WIDTH_HOOK } from "../../Config/screenConfig";
import { MIN_TEMP, MAX_TEMP } from "../../Config/vacation";

import moment from "moment";

interface IProps {
  settingId: string;
}

const FirstContentTitel = styled.p`
  font-size: 40px;
  display: inline-block;
  text-align: left;
  margin-bottom: 10px;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: 700;
`;

const SecondContentTitel = styled.p`
  font-size: 23px;
  color: #fff;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: 700;
`;

const FirstContent = styled.p`
  font-size: 23px;
  display: inline-block;
  text-align: left;
  margin: 0;
  padding-left: 32px;
  padding-right: 32px;
`;

const MobileTitleDark = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #4b4b4b;
`;

const MobileTitleWhite = styled(MobileTitleDark)`
  color: white;
`;

const TargetTemp = styled.p`
  font-size: 60px;
  font-weight: 200;
  margin: 0;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 40px;
  color: #fff;
  text-align: center;
`;

const IconContainer = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 30px;
`;

const containerStyle = {
  minHeight: "100vh",
};

const ChooseRoomButton = styled.button`
  background-color: #f97f21;
  box-shadow: none;
  border-radius: 20px;
  height: 40px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
  padding: 0px 20px 0px 20px;
  margin: 50px 0px 0px 32px;
  :hover {
  }
`;

const VacationAddEdit = () => {
  const history = useHistory();
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [showRoomSelection, setShowRoomSelection] = useState<boolean>(false);

  const { state, dispatch } = useContext(Context);
  const data = state.vacation;
  const roomData = state.rooms;

  const [activeData, setActiveData] = useState<IVacationData | null>(null);

  const params: IProps = useParams();
  const { settingId } = params;

  useEffect(() => {
    if (settingId === "create") {
      setIsCreate(true);
      const nowDate = moment().format("DD.MM.YYYY");
      const nowTime = moment().format("HH:mm");

      const newSetting: IVacationData = {
        id: data.length + 2,
        startDate: nowDate,
        startTime: nowTime,
        endDate: nowDate,
        endTime: nowTime,
        temp: 16,
        selectedRooms: [],
      };
      setActiveData(newSetting);
    } else {
      const settingIdNumber = parseInt(settingId);
      const currentData = data.filter(
        (setting) => setting.id === settingIdNumber
      );

      if (currentData.length == 1) {
        setActiveData(JSON.parse(JSON.stringify(currentData[0])));
      } else {
        console.log("Einstellung nicht gefunden...");
        history.push(NavigationStructure.urlaub.url);
      }
    }
  }, [settingId]);

  const onChangeStartTime = (value: string) => {
    if (activeData != null) {
      setActiveData({ ...activeData, startTime: value });
    }
  };

  const onChangeEndTime = (value: string) => {
    if (activeData != null) {
      setActiveData({ ...activeData, endTime: value });
    }
  };

  const onChangeStartDate = (value: string) => {
    if (activeData != null) {
      setActiveData({ ...activeData, startDate: value });
    }
  };

  const onChangeEndDate = (value: string) => {
    if (activeData != null) {
      setActiveData({ ...activeData, endDate: value });
    }
  };

  const handleTempChange = (event: any, newValue: any) => {
    if (activeData != null) {
      setActiveData({ ...activeData, temp: newValue });
    }
  };

  const onTempIncrease = () => {
    if (activeData != null) {
      setActiveData({ ...activeData, temp: activeData.temp + 1 });
    }
  };

  const onTempDecrease = () => {
    if (activeData != null) {
      setActiveData({ ...activeData, temp: activeData.temp - 1 });
    }
  };

  const handleSave = () => {
    if (activeData != null) {
      if (isCreate) {
        dispatch({
          type: VacationActionTypes.ADD_VACATION,
          payload: activeData,
        });
      } else {
        dispatch({
          type: VacationActionTypes.UPDATE_VACATION,
          payload: activeData,
        });
      }
    }

    history.push(NavigationStructure.urlaub.url);
  };

  const toggleRoom = (id: number) => {
    if (activeData != null) {
      if (activeData?.selectedRooms.indexOf(id) == -1) {
        setActiveData({
          ...activeData,
          selectedRooms: [...activeData.selectedRooms, id],
        });
      } else {
        setActiveData({
          ...activeData,
          selectedRooms: activeData?.selectedRooms.filter((room) => room != id),
        });
      }
    }
  };
  return (
    <Grid container style={containerStyle}>
      {!showRoomSelection && !isMobile && (
        <>
          <Grid item xs={12} lg={4}>
            <ViewInformation
              pageName={NavigationStructure.urlaub.display}
              configuration
              full
            />
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} style={{ maxWidth: "600px" }}>
                <FirstContentTitel>Urlaub festlegen</FirstContentTitel>
                <FirstContent>
                  Legen Sie hier fest, von wann bis wann Sie abwesend sind und
                  welche Temperatur in dieser Zeit gelten soll.
                </FirstContent>
                <ChooseRoomButton onClick={() => setShowRoomSelection(true)}>
                  Räume wählen
                </ChooseRoomButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            style={{ backgroundColor: "#FD931E", padding: "80px 0px 80px 0px" }}
          >
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              style={{
                textAlign: "center",
                minHeight: "100vh",
              }}
            >
              <Grid item style={{ paddingBottom: "30px" }}>
                <Box display="flex" alignItems="center">
                  <IconContainer src={VacationStartSVG} />
                  <DateTimeController
                    time={activeData?.startTime}
                    date={activeData?.startDate}
                    onChangeTime={onChangeStartTime}
                    onChangeDate={onChangeStartDate}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <IconContainer src={VacationEndSVG} />
                  <DateTimeController
                    time={activeData?.endTime}
                    date={activeData?.endDate}
                    onChangeTime={onChangeEndTime}
                    onChangeDate={onChangeEndDate}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} style={{ padding: "80px 0px 0px 0px" }}>
                <Grid container>
                  <Grid item style={{ paddingRight: "25px" }}>
                    <ActionButtonOutlined variant="save" onClick={handleSave} />
                  </Grid>
                  <Grid item>
                    <ActionButtonOutlined
                      variant="cancel"
                      onClick={() => {
                        history.push(NavigationStructure.urlaub.url);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={2} style={{ backgroundColor: "#F97F21" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item>
                {/*TODO send off to CPU ?!*/}
                <TargetTemp>
                  {activeData?.temp == MIN_TEMP
                    ? "Aus"
                    : `${activeData?.temp}°`}
                </TargetTemp>
                <div style={{ height: 350, textAlign: "center" }}>
                  <CustomSlider
                    orientation="vertical"
                    value={activeData != null ? activeData.temp : MIN_TEMP}
                    min={MIN_TEMP}
                    max={MAX_TEMP}
                    onChange={handleTempChange}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {showRoomSelection && !isMobile && (
        <>
          <Grid item xs={12} lg={4}>
            <ViewInformation
              pageName={NavigationStructure.urlaub.display}
              configuration
              full
            />
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} style={{ maxWidth: "600px" }}>
                <FirstContentTitel>Räume wählen</FirstContentTitel>
                <FirstContent>
                  Legen Sie hier fest, für welche Räume die Zeiten der
                  Abwesen-heit gelten sollen.
                </FirstContent>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={8}
            style={{ backgroundColor: "#F97F21", padding: "60px 0px 80px 0px" }}
          >
            <SecondContentTitel>Räume</SecondContentTitel>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              style={{
                textAlign: "center",
                minHeight: "100vh",
              }}
            >
              <Grid item>
                <Grid container>
                  {roomData.map((room) => (
                    <Grid
                      item
                      xs={4}
                      style={{ paddingBottom: "30px" }}
                      key={room.id}
                    >
                      <RoomButton
                        id={room.id}
                        label={room.name}
                        onClick={() => toggleRoom(room.id)}
                        selected={
                          activeData?.selectedRooms.indexOf(room.id) != -1
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ padding: "80px 0px 0px 0px" }}>
                <Grid container>
                  <Grid item style={{ paddingRight: "25px" }}>
                    <ActionButtonOutlined
                      variant="save"
                      onClick={() => setShowRoomSelection(false)}
                    />
                  </Grid>
                  <Grid item>
                    <ActionButtonOutlined
                      variant="cancel"
                      onClick={() => setShowRoomSelection(false)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {isMobile && (
        <>
          <Grid item xs={12} style={{ paddingBottom: "60px" }}>
            <ViewInformation
              pageName={NavigationStructure.urlaub.display}
              configuration
              full
            />
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Grid item style={{ paddingBottom: "30px" }}>
                  <MobileTitleDark>Startzeit</MobileTitleDark>
                  <DateTimeControllerMobile
                    time={activeData?.startTime}
                    date={activeData?.startDate}
                    onChangeTime={onChangeStartTime}
                    onChangeDate={onChangeStartDate}
                  />
                </Grid>
                <Grid item>
                  <MobileTitleDark>Endzeit</MobileTitleDark>
                  <DateTimeControllerMobile
                    time={activeData?.endTime}
                    date={activeData?.endDate}
                    onChangeTime={onChangeEndTime}
                    onChangeDate={onChangeEndDate}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: "#F97F21",
              padding: "40px 0px 80px 0px",
              textAlign: "center",
            }}
          >
            <MobileTitleWhite>Temperatur einstellen</MobileTitleWhite>
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <TempController
                min={MIN_TEMP}
                max={MAX_TEMP}
                value={activeData != null ? activeData?.temp : MIN_TEMP}
                onIncrease={onTempIncrease}
                onDecrease={onTempDecrease}
              />
            </div>
            <MobileTitleWhite>Raum wählen</MobileTitleWhite>

            <Grid
              container
              spacing={2}
              justify="center"
              style={{ width: isMobile ? "100%" : "auto" }}
            >
              {roomData.map((room) => (
                <Grid item key={room.id}>
                  <RoomButton
                    id={room.id}
                    label={room.name}
                    onClick={() => toggleRoom(room.id)}
                    selected={activeData?.selectedRooms.indexOf(room.id) != -1}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              style={{
                textAlign: "center",
              }}
            >
              <Grid item xs={12} style={{ padding: "40px 0px 0px 0px" }}>
                <Grid container>
                  <Grid item style={{ paddingRight: "25px" }}>
                    <ActionButtonOutlined variant="save" onClick={handleSave} />
                  </Grid>
                  <Grid item>
                    <ActionButtonOutlined
                      variant="cancel"
                      onClick={() => {
                        history.push(NavigationStructure.urlaub.url);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default VacationAddEdit;
