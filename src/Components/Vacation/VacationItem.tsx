import React from "react";
import { Grid, Box } from "@material-ui/core";
import styled from "styled-components";

import EditIconSVG from "../../Images/Icons/editFullCircle.svg";
import DeleteIconSVG from "../../Images/Icons/deleteFullCircle.svg";
import VacationStartSVG from "../../Images/Icons/vacationStart.svg";
import VacationEndSVG from "../../Images/Icons/vavationEnd.svg";
import HeatingSVG from "../../Images/Icons/heating.svg";
import { IVacationData } from "../../Interfaces/Interfaces";
import { MIN_TEMP } from "../../Config/vacation";

const EditIcon = styled.img`
  height: 68px;
  width: 68px;
  margin-right: 20px;
  cursor: pointer;
`;

const DeleteIcon = styled.img`
  height: 68px;
  width: 68px;
  cursor: pointer;
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
`;

const ContentDate = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin: 0;
  text-align: "center";
  padding-left: 40px;
`;

const ContentTime = styled(ContentDate)``;

const ContentTemp = styled(ContentDate)`
  font-weight: 700;
`;

const VacationStartIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const TempIcon = styled.img`
  width: 48px;
  height: 55px;
`;

interface IProps extends IVacationData {
  onDelete: () => void;
  onEdit: () => void;
}

const VacationItem = ({
  startTime,
  startDate,
  endTime,
  endDate,
  temp,
  onDelete,
  onEdit,
}: IProps) => {
  return (
    <Container>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ height: "120px" }}
      >
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            style={{ height: "100%", paddingLeft: "30px" }}
          >
            <VacationStartIcon src={VacationStartSVG} />
            <ContentDate>{startDate}</ContentDate>
            <ContentTime>{startTime}</ContentTime>
          </Box>
        </Grid>

        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            style={{ height: "100%", paddingLeft: "30px" }}
          >
            <VacationStartIcon src={VacationEndSVG} />
            <ContentDate>{endDate}</ContentDate>
            <ContentTime>{endTime}</ContentTime>
          </Box>
        </Grid>

        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            style={{ height: "100%", paddingLeft: "30px" }}
          >
            <TempIcon src={HeatingSVG} />
            <ContentTemp>{temp === MIN_TEMP ? "Aus" : `${temp}°`}</ContentTemp>
          </Box>
        </Grid>

        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            style={{ height: "100%", paddingRight: "30px" }}
          >
            <EditIcon src={EditIconSVG} onClick={onEdit} />
            <DeleteIcon src={DeleteIconSVG} onClick={onDelete} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(VacationItem);
