import React from "react";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const CustomSwitcher = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 60,
      height: 36,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 3,
      border: "none",
      "&$checked": {
        transform: "translateX(24px)",
        border: "none",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#FF931E",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#FF931E",
        border: "none",
      },
    },
    thumb: {
      width: 30,
      height: 30,
      border: "none",
      boxShadow: "none",
    },
    track: {
      borderRadius: 36 / 2,
      border: "none",
      backgroundColor: "#C9C9C9",
      opacity: 1,
      transition: theme.transitions.create(["background-color"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default React.memo(CustomSwitcher);
