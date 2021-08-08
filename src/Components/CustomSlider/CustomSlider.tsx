import React from "react";
import { Slider, withStyles } from "@material-ui/core";

const CustomSlider = withStyles({
  root: {
    color: "#fff",
    height: 5,
    "&$vertical": {
      width: 5,
    },
  },
  thumb: {
    height: 48,
    width: 48,
    marginTop: -24,
    marginLeft: -24,
  },
  active: {},
  track: {
    height: 5,
    borderRadius: 5,
  },
  rail: {
    height: 5,
    borderRadius: 5,
  },
  vertical: {
    "& $rail": {
      width: 5,
    },
    "& $track": {
      width: 5,
    },
    "& $thumb": {
      marginLeft: -22,
      marginBottom: -24,
    },
  },
})(Slider);

export default CustomSlider;
