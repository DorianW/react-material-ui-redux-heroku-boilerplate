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

interface IProps extends IVacationData {
  onDelete: () => void;
  onEdit: () => void;
}

const EditIcon = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  right: 45px;
`;

const DeleteIcon = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const Container = styled.div`
  max-width: 95%;
  width: 95%;
  box-shadow: 3px 3px 7px #ded9d3;
  border-radius: 5px;
  margin-right: 0px;
  margin-left: 0px;
  margin-bottom: 16px;
  height: 150px;
  position: relative;
  background-color: white;
`;

const ContentDate = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  text-align: "center";
`;

const ContentTime = styled(ContentDate)`
  padding-left: 15px;
`;

const ContentTemp = styled.p`
  font-weight: 400;
  font-size: 30px;
  padding: 0px;
  margin: 0px;
`;

const VacationStartIcon = styled.img`
  width: 20px;
  height: 20px;
  padding-right: 20px;
`;

const TempIcon = styled.img`
  width: 20px;
  height: 20px;
  padding-right: 20px;
`;

const VacationItem = ({
  id,
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
      <Grid container style={{ height: "150px", padding: "15px 0px 15px 0px" }}>
        <Grid item xs={12} style={{ padding: "0px 20px 0px 20px" }}>
          <Box display="flex" alignItems="center">
            <TempIcon src={HeatingSVG} />
            <ContentTemp>{temp == MIN_TEMP ? "Aus" : `${temp}°`}</ContentTemp>
          </Box>
        </Grid>

        <Grid item xs={12} style={{ padding: "20px 20px 0px 20px" }}>
          <Box display="flex" alignItems="center">
            <VacationStartIcon src={VacationStartSVG} />
            <ContentDate>{startDate}</ContentDate>
            <ContentTime>{startTime}</ContentTime>
          </Box>
        </Grid>

        <Grid item xs={12} style={{ padding: "10px 20px 0px 20px" }}>
          <Box display="flex" alignItems="center">
            <VacationStartIcon src={VacationEndSVG} />
            <ContentDate>{endDate}</ContentDate>
            <ContentTime>{endTime}</ContentTime>
          </Box>
        </Grid>
      </Grid>
      <EditIcon src={EditIconSVG} onClick={onEdit} />
      <DeleteIcon src={DeleteIconSVG} onClick={onDelete} />
    </Container>
  );
};

export default React.memo(VacationItem);
