import React from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Logo from "../../Images/logo.svg";
import Settings from "../../Images/Icons/settings.svg";
import { NavigationStructure } from "../../Config/NavigationStructure";

import {
  MAX_MOBILE_WIDTH_HOOK,
  MAX_MOBILE_WIDTH,
} from "../../Config/screenConfig";

const NavigationContainer = styled.div`
  width: 100%;
  background: transparent linear-gradient(90deg, #ff5100 0%, #ff931e 100%) 0% 0%
    no-repeat padding-box;
  height: 90px;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    height: 60px;
  }
`;

const Header = () => {
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });

  let history = useHistory();
  const redirectTo = (url) => {
    history.push(url);
  };

  return (
    <NavigationContainer>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ height: isMobile ? 60 : 90 }}
      >
        <Grid item xs={6} style={{ paddingLeft: "40px" }}>
          <img
            onClick={() => {
              redirectTo(NavigationStructure.home.url);
            }}
            style={{ cursor: "pointer" }}
            src={Logo}
            height={53}
            width={45}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            <Grid item style={{ paddingRight: isMobile ? 25 : 65 }}>
              <img
                onClick={() => {
                  redirectTo(NavigationStructure.configuration.url);
                }}
                style={{ cursor: "pointer" }}
                src={Settings}
                height={isMobile ? 25 : 32}
                width={isMobile ? 25 : 32}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NavigationContainer>
  );
};

export default Header;
