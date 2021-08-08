import React from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";

import { MAX_MOBILE_WIDTH } from "../../Config/screenConfig";

const ControllerWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 213px;
  height: 200px;
  display: inline-block;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    width: 100px;
    height: 130px;
  }
  cursor: pointer;
`;

const Value = styled.p`
  font-size: 60px;
  font-weight: 400;
  margin: 0;
  color: #c9c9c9;
  text-align: center;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    font-size: 25px;
  }
`;

const TempControllerAdd = () => {
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
          <Value>+</Value>
        </div>
      </Box>
    </ControllerWrapper>
  );
};

export default TempControllerAdd;
