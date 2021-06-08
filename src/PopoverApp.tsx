import React from "react";
import { AlternativePopoverElement } from "./AlternativePopoverElement";

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
    <AlternativePopoverElement
      title="GAAP"
      description="is cool"
      tags={["test"]}
    >
      GAAP
    </AlternativePopoverElement>
  );
};

const stuff = <RealPopoverApp />;
export default stuff;
