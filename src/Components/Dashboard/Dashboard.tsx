import React, { useState, useContext } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid } from "@material-ui/core";

import { Context } from "../../Store/Store";

import ViewInformation from "../ViewInformation/ViewInformation";
import GridSlider from "../GridSlider/GridSlider";
import Room from "../Room/Room";

import { NavigationStructure } from "../../Config/NavigationStructure";
import { MAX_MOBILE_WIDTH_HOOK } from "../../Config/screenConfig";
import { MAX_ITEMS } from "../../Config/sliderConfig";

const Dashboard = () => {
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });

  const { state } = useContext(Context);
  const roomsData = state.rooms;
  const [maxSlide] = useState<number>(Math.ceil(roomsData.length / MAX_ITEMS));
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const onNextSlide = (next: number, active: number) => {
    setCurrentSlide(active + 2);
  };

  const onPrevSlide = (prev: number, active: number) => {
    setCurrentSlide(active);
  };

  const renderRoomItems = (maxItems: number) => {
    var rows = [];
    for (let i = 0; i < Math.ceil(roomsData.length / maxItems); i++) {
      rows.push(
        <Grid
          container
          justify="center"
          style={{
            minHeight: isMobile ? "auto" : "564px",
            width: isMobile ? "100%" : "auto",
          }}
          spacing={isMobile ? 1 : 4}
          key={i}
        >
          {roomsData.map((room, index) => {
            if (index >= i * maxItems && index < (i + 1) * maxItems) {
              return (
                <Grid item key={room.id}>
                  <Room {...room}></Room>
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      );
    }
    return rows;
  };
  return (
    <div style={{ paddingBottom: "100px" }}>
      <ViewInformation
        pageName={NavigationStructure.home.display}
        currentPage={currentSlide}
        maxPage={maxSlide}
      />

      {!isMobile && roomsData.length > MAX_ITEMS && (
        <GridSlider next={onNextSlide} prev={onPrevSlide}>
          {renderRoomItems(MAX_ITEMS)}
        </GridSlider>
      )}
      {(isMobile || roomsData.length <= MAX_ITEMS) && renderRoomItems(99)}
    </div>
  );
};

export default Dashboard;
