import React from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styled from "styled-components";

import AddFullCircleSVG from "../../Images/Icons/addFullCircle.svg";

import {
  MAX_MOBILE_WIDTH_HOOK,
  MAX_MOBILE_WIDTH,
} from "../../Config/screenConfig";

interface IProps {
  onClick: () => void;
}

const AddIcon = styled.img`
  height: 68px;
  width: 68px;
  margin-right: 30px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    height: 42px;
    width: 42px;
    margin-right: 0px;
  }
`;

const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  margin-right: 32px;
  margin-left: 32px;
  margin-bottom: 32px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 10px;
  height: 120px;
  cursor: pointer;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    max-width: 95%;
    width: 95%;
    box-shadow: 3px 3px 7px #ded9d3;
    border-radius: 5px;
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 16px;
    height: 150px;
  }
`;

const VacationItemAdd = ({ onClick }: IProps) => {
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });

  return (
    <Container onClick={onClick}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ height: isMobile ? "150px" : "120px" }}
      >
        <Grid item xs={12} style={{ textAlign: isMobile ? "center" : "right" }}>
          <AddIcon src={AddFullCircleSVG}></AddIcon>
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(VacationItemAdd);
