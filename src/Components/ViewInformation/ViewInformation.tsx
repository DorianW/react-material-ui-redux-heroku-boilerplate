import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  MAX_MOBILE_WIDTH_HOOK,
  MAX_MOBILE_WIDTH,
} from "../../Config/screenConfig";
import HelpIcon from "../../Images/Icons/help.svg";

type ViewInformationProps = {
  pageName: string;
  currentPage?: number;
  maxPage?: number;
  configuration?: boolean;
  configurationLabel?: string;
  full?: boolean;
  customInformation?: string;
  onHelp?: () => void;
};

const FontNormal = styled.p`
  font-size: 23px;
  color: #4b4b4b;
  font-weight: 400;
  display: inline-block;
  margin: 0;
  @media only screen and (max-width: ${MAX_MOBILE_WIDTH}px) {
    text-align: center;
    font-size: 10px;
  }
`;

const FontBold = styled(FontNormal)`
  font-weight: 700;
`;

const Help = styled.img`
  cursor: pointer;
  margin-left: 10px;
  width: 15px;
  height: 15px;
`;

const ViewInformation = ({
  pageName,
  currentPage,
  maxPage,
  configuration,
  full,
  customInformation,
  configurationLabel,
  onHelp,
}: ViewInformationProps) => {
  const isMobile = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH_HOOK}px)`, {
    noSsr: true,
  });

  let showAdditionalInformation =
    (!!maxPage && maxPage > 1) || customInformation != null;
  let secondText: string = `Seite ${currentPage}/${maxPage}`;
  if (customInformation != null) {
    secondText = customInformation;
  }

  const showHelp = typeof onHelp != "undefined";

  return (
    <Grid
      container
      style={{
        paddingTop: isMobile ? 10 : 56,
        paddingLeft: isMobile ? 10 : 40,
        paddingRight: isMobile ? 10 : 85,
      }}
      justify="center"
    >
      <Grid
        item
        md={12}
        lg={full ? 12 : 6}
        style={{ paddingBottom: "45px", display: "flex", alignItems: "center" }}
      >
        {!configuration && <FontNormal>{pageName}</FontNormal>}
        {configuration && (
          <>
            <FontNormal>
              {!!configurationLabel ? configurationLabel : "Konfiguration"}
              &nbsp;-&nbsp;
            </FontNormal>
            <FontBold>{pageName}</FontBold>
            {showHelp && <Help src={HelpIcon} onClick={onHelp} />}
          </>
        )}
      </Grid>
      {!isMobile && !full && (
        <Grid item md={12} lg={6} style={{ textAlign: "right" }}>
          {showAdditionalInformation && <FontNormal>{secondText}</FontNormal>}
        </Grid>
      )}
    </Grid>
  );
};

export default ViewInformation;
