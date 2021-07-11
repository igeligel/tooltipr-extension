import React from "react";
import { ThemeProvider } from "@emotion/react";
import { AlternativePopoverElement } from "./AlternativePopoverElement";

const lightTheme = {
  colors: {
    PopoverContentBackgroundColor: "white",
  },
};

const darkTheme = {
  colors: {
    PopoverContentBackgroundColor: "white",
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
