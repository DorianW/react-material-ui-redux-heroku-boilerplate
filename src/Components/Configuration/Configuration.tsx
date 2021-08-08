import React from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { NavigationStructure } from "../../Config/NavigationStructure";
import ViewInformation from "../ViewInformation/ViewInformation";
import ConfigurationButton from "./Button/Button";
import ButtonAction from "./Button/ButtonAction";

import { MAX_MOBILE_WIDTH_HOOK } from "../../Config/screenConfig";
import { LOCAL_STORAGE_NAME } from "../../Store/Store";

const Configuration = () => {
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });
  const buttonsToRender = [
    { ...NavigationStructure.trinkwasser },
    { ...NavigationStructure.urlaub },
  ];

  const onResetDemo = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    alert("Die Einstellungen wurden gelöscht!");
    window.location.reload();
  };

  return (
    <>
      <ViewInformation pageName={NavigationStructure.configuration.display} />
      <Grid
        container
        justify="center"
        style={{
          margin: "auto",
          paddingBottom: isMobile ? 10 : 85,
          width: "100%",
        }}
        spacing={isMobile ? 2 : 4}
      >
        {buttonsToRender.map((button) => (
          <Grid
            item
            md={12}
            style={{ textAlign: "center" }}
            key={button.display}
          >
            <ConfigurationButton {...button} />
          </Grid>
        ))}
        <Grid item md={12} style={{ textAlign: "center" }}>
          <ButtonAction display="Demo Reset" onClick={onResetDemo} />
        </Grid>
      </Grid>
    </>
  );
};

export default Configuration;
