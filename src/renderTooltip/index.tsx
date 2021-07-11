import React from "react";
import { ThemeProvider } from "@emotion/react";
import { AlternativePopoverElement } from "./AlternativePopoverElement";

const gray200 = "#e2e8f0";
const gray300 = "#CBD5E0";
const gray500 = "#718096";
const gray700 = "#2D3748";

const cyan50 = "#EDFDFD";
const cyan900 = "#065666";

const lightTheme = {
  colors: {
    PopoverContentBackgroundColor: "white",
    SettingMenuButtonColor: gray200,
    PopoverHeadingHeadingColor: "black",
    ParagraphColor: gray500,
    FooterBackground: cyan50,
    FooterTextColor: cyan900,
  },
};

const darkTheme = {
  colors: {
    PopoverContentBackgroundColor: gray700,
    SettingMenuButtonColor: gray500,
    PopoverHeadingHeadingColor: "white",
    ParagraphColor: gray300,
    FooterBackground: cyan900,
    FooterTextColor: cyan50,
  },
};

const RealPopoverApp = (props) => {
  return (
    <ThemeProvider theme={props.isDarkMode ? darkTheme : lightTheme}>
      <AlternativePopoverElement
        title={props.title}
        description={props.description}
        tags={props.tags}
      >
        {props.replacementText}
      </AlternativePopoverElement>
    </ThemeProvider>
  );
};

const stuff = (props) => <RealPopoverApp {...props} />;
export default stuff;
