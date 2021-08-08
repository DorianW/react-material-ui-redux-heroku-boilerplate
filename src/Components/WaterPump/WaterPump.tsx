import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styled from "styled-components";

import { NavigationStructure } from "../../Config/NavigationStructure";
import ViewInformation from "../ViewInformation/ViewInformation";
import CustomSlider from "../CustomSlider/CustomSlider";
import TempController from "../TempController/TempController";
import { Context, WaterPumpActionTypes } from "../../Store/Store";

import {
  MAX_MOBILE_WIDTH_HOOK,
  MAX_MOBILE_WIDTH,
} from "../../Config/screenConfig";

const FirstContentTitel = styled.p`
  font-size: 40px;
  display: inline-block;
  text-align: left;
  margin-bottom: 10px;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: 700;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 25px;
    display: block;
    text-align: center;
    margin-bottom: 0px;
  }
`;

const SecondContentTitel = styled.p`
  font-size: 23px;
  color: #fff;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: 700;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 16px;
  }
`;

const SecondContent = styled(SecondContentTitel)`
  font-weight: 400;
  max-width: 400px;
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
    padding-bottom: 0px;
  }
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

const containerStyle = {
  minHeight: "100vh",
};

const WaterPump = () => {
  const min = 40;
  const max = 60;
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });
  const { state, dispatch } = useContext(Context);
  const { currentTemp, targetTemp } = state.waterPump;

  const onIncreaseTergetTemp = () => {
    updateTargetTemp(targetTemp + 1);
  };

  const onDecreaseTergetTemp = () => {
    updateTargetTemp(targetTemp - 1);
  };

  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (typeof value == "number") {
      updateTargetTemp(value);
    }
  };

  const updateTargetTemp = (temp: number) => {
    dispatch({
      type: WaterPumpActionTypes.UPDATE_TARGET_TEMP,
      payload: { temp },
    });
  };

  return (
    <>
      <Grid container style={containerStyle}>
        <Grid item xs={12} lg={6}>
          <ViewInformation
            pageName={NavigationStructure.trinkwasser.display}
            configuration
            full
          />
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} style={{ maxWidth: "600px" }}>
              <FirstContentTitel>Trinkwarmwasser</FirstContentTitel>
              <FirstContent>aktuelle Temperatur</FirstContent>
              <CurrentTemp>{currentTemp}°C</CurrentTemp>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} style={{ backgroundColor: "#F97F21" }}>
          <Grid
            container
            direction="column"
            justify="center"
            style={{
              padding: "40px 0px 60px 0px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <SecondContentTitel>Temperatur</SecondContentTitel>
            <SecondContent>
              Definieren Sie hier die gewünschte maximale Trinkwassertemperatur.
            </SecondContent>

            {isMobile && (
              <div style={{ textAlign: "center" }}>
                <TempController
                  min={min}
                  max={max}
                  value={targetTemp}
                  onIncrease={onIncreaseTergetTemp}
                  onDecrease={onDecreaseTergetTemp}
                />
              </div>
            )}
            {!isMobile && (
              <>
                <TargetTemp>{targetTemp}°C</TargetTemp>
                <div style={{ height: 450, textAlign: "center" }}>
                  <div style={{ height: 350, textAlign: "center" }}>
                    <CustomSlider
                      orientation="vertical"
                      value={targetTemp}
                      min={min}
                      max={max}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default WaterPump;
