import React from "react";
import { Typography } from "@material-ui/core";

const PageNotFound = () => {
  return (
    <Typography
      align="center"
      variant="h4"
      style={{ paddingTop: "40px", color: "white" }}
    >
      Die Seite konnte nicht gefunden werden.
    </Typography>
  );
};

export default PageNotFound;
