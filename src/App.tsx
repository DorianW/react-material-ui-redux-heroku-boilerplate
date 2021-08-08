import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import styled from "styled-components";

import { NavigationStructure } from "./Config/NavigationStructure";

import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Navigation/Header";
import PageNotFound from "./Components/Navigation/PageNotFound";
import Configuration from "./Components/Configuration/Configuration";
import WaterPump from "./Components/WaterPump/WaterPump";
import Vacation from "./Components/Vacation/Vacation";
import VacationAddEdit from "./Components/Vacation/VacationAddEdit";
import RoomDetails from "./Components/Room/RoomDetails";
import { MAX_MOBILE_WIDTH } from "./Config/screenConfig";
import { StoreProvider } from "./Store/Store";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: MAX_MOBILE_WIDTH + 1,
      md: MAX_MOBILE_WIDTH + 1,
      lg: MAX_MOBILE_WIDTH + 1,
      xl: 1200,
    },
  },
});

const FooterContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

const AppContainer = styled.div`
  margin: 0;
  min-height: 100vh;
  background: #faf8f5 0% 0% no-repeat padding-box;
  position: relative;
`;

function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Router>
            <Header />
            <Switch>
              <Route
                exact
                path={NavigationStructure.home.url}
                component={Dashboard}
              />
              <Route
                exact
                path={NavigationStructure.configuration.url}
                component={Configuration}
              />
              <Route
                exact
                path={NavigationStructure.trinkwasser.url}
                component={WaterPump}
              />
              <Route
                exact
                path={NavigationStructure.urlaub.url}
                component={Vacation}
              />
              <Route
                exact
                path={NavigationStructure.urlaubEdit.url}
                component={VacationAddEdit}
              />
              <Route
                exact
                path={NavigationStructure.roomSettings.urlWithParams}
                component={RoomDetails}
              />
              <Route path="/404" component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
          </Router>
        </AppContainer>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
