import React from "react";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
import NextIconSVG from "../../Images/Icons/GridSlider/next.svg";

const NextIcon = styled.img`
  width: 68px;
  height: 68px;
`;

const PrevIcon = styled(NextIcon)`
  transform: rotate(180deg);
`;

interface IProps {
  children: any;
  indicatorPaddingTop?: number;
  navButtonsMarginTop?: number;
  next: (next: number, active: number) => void;
  prev: (next: number, active: number) => void;
  onChange?: (index: number, active: number) => void;
}

const GridSlider = ({
  next,
  prev,
  children,
  indicatorPaddingTop,
  navButtonsMarginTop,
  onChange,
}: IProps) => {
  return (
    <Carousel
      animation="slide"
      navButtonsAlwaysVisible
      autoPlay={false}
      cycleNavigation={false}
      changeOnFirstRender={false}
      timeout={{ appear: 50, enter: 100, exit: 50 }}
      next={next}
      prev={prev}
      activeIndicatorIconButtonProps={{
        style: { color: "#FF5100" },
        className: "",
      }}
      indicatorIconButtonProps={{
        style: { color: "#C9C9C9" },
        className: "",
      }}
      indicatorContainerProps={{
        style: {
          paddingTop: `${
            typeof indicatorPaddingTop == "undefined" ? 60 : indicatorPaddingTop
          }px`,
        },
        className: "",
      }}
      NextIcon={<NextIcon src={NextIconSVG} />}
      PrevIcon={<PrevIcon src={NextIconSVG} />}
      navButtonsProps={{
        className: "",
        style: {
          backgroundColor: "transparent",
          padding: "0px 0px 0px 0px",
          margin: `${
            typeof navButtonsMarginTop == "undefined"
              ? -74
              : navButtonsMarginTop
          }px 0px 0px 0px`,
          borderRadius: 0,
        },
      }}
      onChange={typeof onChange != "undefined" ? onChange : () => {}}
    >
      {children}
    </Carousel>
  );
};

export default GridSlider;
