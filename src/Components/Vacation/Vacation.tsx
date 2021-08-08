import React, { useState, useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";
import { Context, VacationActionTypes } from "../../Store/Store";

import VacationItem from "./VacationItem";
import VacationItemMobile from "./VacationItemMobile";

import VacationItemAdd from "./VacationItemAdd";

import { NavigationStructure } from "../../Config/NavigationStructure";
import ViewInformation from "../ViewInformation/ViewInformation";

import GridSlider from "../GridSlider/GridSlider";

import { MAX_MOBILE_WIDTH_HOOK } from "../../Config/screenConfig";
import { MAX_ITEMS } from "../../Config/sliderConfig";

const Vacation = () => {
  const history = useHistory();
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });

  const { state, dispatch } = useContext(Context);
  const data = state.vacation;
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [maxSlide, setMaxSlide] = useState<number>(
    Math.ceil(data.length / MAX_ITEMS)
  );

  useEffect(() => {
    setMaxSlide(Math.ceil(data.length / MAX_ITEMS));
  }, [data.length]);

  const handleOnDelete = (id: number): void => {
    dispatch({ type: VacationActionTypes.DELETE_VACATION, payload: { id } });
  };

  const handleOnEdit = (id: number): void => {
    history.push(`${NavigationStructure.urlaub.url}/${id}`);
  };
  const handleOnAdd = (): void => {
    history.push(`${NavigationStructure.urlaubAdd.url}`);
  };

  const onNextSlide = (next: number, active: number) => {
    setCurrentSlide(active + 2);
  };

  const onPrevSlide = (prev: number, active: number) => {
    setCurrentSlide(active);
  };

  const onChangeSlide = (index: number, active: number) => {
    setCurrentSlide(index + 1);
  };

  const renderItems = (maxItems: number) => {
    var rows = [];
    if (data.length == 0) {
      return (
        <Grid container justify="center" alignItems="center">
          <VacationItemAdd onClick={handleOnAdd} />
        </Grid>
      );
    }
    for (let i = 0; i < Math.ceil(data.length / maxItems); i++) {
      rows.push(
        <Grid container justify="center" alignItems="center" key={i}>
          {data.map((dataItem, index) => {
            if (index >= i * maxItems && index < (i + 1) * maxItems) {
              if (isMobile) {
                return (
                  <VacationItemMobile
                    key={dataItem.id}
                    {...dataItem}
                    onDelete={() => handleOnDelete(dataItem.id)}
                    onEdit={() => handleOnEdit(dataItem.id)}
                  />
                );
              } else {
                return (
                  <VacationItem
                    key={dataItem.id}
                    {...dataItem}
                    onDelete={() => handleOnDelete(dataItem.id)}
                    onEdit={() => handleOnEdit(dataItem.id)}
                  />
                );
              }
            } else {
              return null;
            }
          })}
          <VacationItemAdd onClick={handleOnAdd} />
        </Grid>
      );
    }
    return rows;
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      <ViewInformation
        pageName={NavigationStructure.urlaub.display}
        currentPage={currentSlide}
        maxPage={maxSlide}
      />
      {!isMobile && data.length > MAX_ITEMS && (
        <GridSlider
          next={onNextSlide}
          prev={onPrevSlide}
          indicatorPaddingTop={0}
          navButtonsMarginTop={0}
          onChange={onChangeSlide}
        >
          {renderItems(MAX_ITEMS)}
        </GridSlider>
      )}
      {(isMobile || data.length <= MAX_ITEMS) && renderItems(99)}
    </div>
  );
};

export default Vacation;
