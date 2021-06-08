import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { PopoverElement } from "./PopoverElement";

// delete theme.styles.global;

// const customTheme = {
//   ...theme,
//   styles: {
//     global: {
//       ".tooltipr-component-root": oldGlobal,
//     },
//   },
// };

const RealPopoverApp = () => {
  return (
    // theme={customTheme}
    <ChakraProvider cssVarsRoot="body" resetCSS={false} theme={theme}>
      <PopoverElement title="GAAP" description="is cool" tags={["test"]}>
        GAAP
      </PopoverElement>
    </ChakraProvider>
  );
};

const stuff = <RealPopoverApp />;
export default stuff;
