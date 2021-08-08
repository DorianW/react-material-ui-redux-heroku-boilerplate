import React from "react";
import styled from "styled-components";
import { Box, Grid } from "@material-ui/core";

import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

const ControllerWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 480px;
  height: 200px;
  display: flex;
  text-align: center;
  cursor: pointer;
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
  color: #c9c9c9;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 25px;
  }
`;

const TimeTempControllerAdd = () => {
  return (
    <ControllerWrapper>
      <Grid container justify="center" style={{ padding: "0px 40px 0px 40px" }}>
        <Grid item>
          <Box
            display="flex"
            style={{ height: "100%" }}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div>
              <Value>+</Value>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ControllerWrapper>
  );
};

export default TimeTempControllerAdd;
