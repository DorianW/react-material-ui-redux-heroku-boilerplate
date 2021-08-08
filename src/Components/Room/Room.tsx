import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import MainRoom from "../../Images/Icons/mainRoom.svg";
import Cooling from "../../Images/Icons/cooling.svg";
import Heating from "../../Images/Icons/heating.svg";
import { NavigationStructure } from "../../Config/NavigationStructure";
import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

type RoomProps = {
  name?: string;
  id?: number;
  temp?: number;
  isCooling?: boolean;
  isHeating?: boolean;
  isMain?: boolean;
} & typeof defaultProps;

const defaultProps = {
  name: "--",
  id: -1,
  temp: 25.5,
  isCooling: false,
  isHeating: false,
  isMain: false,
};

const useStyles = makeStyles((theme) => ({
  name: {
    order: 2,
    [theme.breakpoints.up("lg")]: {
      order: 1,
    },
  },
  icons: {
    order: 1,
    [theme.breakpoints.up("lg")]: {
      order: 2,
    },
  },
}));

const RoomContainer = styled.div`
  width: 589px;
  max-height: 182px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 10px;
  padding: 34px 40px 34px 40px;
  cursor: pointer;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 130px;
    height: 104px;
    padding: 10px 10px 10px 10px;
    box-shadow: 3px 3px 7px #ded9d3;
    border-radius: 5px;
  }
`;

const TempContainer = styled.div`
  color: #4b4b4b;
  font-size: 120px;
  padding-top: 10px;
  font-weight: 300;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 50px;
  }
`;

const CoolingIcon = styled.img`
  width: 40px;
  height: 46px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 15px;
    height: 17px;
  }
`;

const HeatingIcon = styled.img`
  width: 40px;
  height: 46px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 15px;
    height: 17px;
  }
`;

const Room = ({ name, id, temp, isCooling, isHeating, isMain }: RoomProps) => {
  const history = useHistory();
  const MainIcon = styled.img`
    width: 40px;
    height: 39px;
    padding-right: ${() => (isCooling || isHeating ? "20px" : "0")};
    @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
      width: 15px;
      height: 15px;
      padding-right: ${() => (isCooling || isHeating ? "10px" : "0")};
    }
  `;

  const NameContainer = styled.div`
    color: #4b4b4b;
    font-size: 30px;
    font-weight: 400;
    @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
      font-size: 14px;
      padding-top: ${() =>
        !isCooling && !isHeating && !isMain ? "20px" : "0px"};
    }
  `;

  const goToRoomSetting = () => {
    history.push(`${NavigationStructure.roomSettings.url}/${id}`);
  };

  const classes = useStyles();
  return (
    <RoomContainer onClick={goToRoomSetting}>
      <Grid container>
        <Grid item xs={12} lg={6} className={classes.name}>
          <NameContainer>{name}</NameContainer>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ textAlign: "end" }}
          lg={6}
          className={classes.icons}
        >
          {isMain && <MainIcon src={MainRoom}></MainIcon>}
          {isCooling && <CoolingIcon src={Cooling}></CoolingIcon>}
          {isHeating && <HeatingIcon src={Heating}></HeatingIcon>}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12}>
          <TempContainer>{temp.toString().replace(".", ",")}°</TempContainer>
        </Grid>
      </Grid>
    </RoomContainer>
  );
};
Room.defaultProps = defaultProps;
export default Room;
