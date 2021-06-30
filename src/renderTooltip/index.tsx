import React from "react";
import { AlternativePopoverElement } from "./AlternativePopoverElement";

const RealPopoverApp = (props) => {
  return (
    <AlternativePopoverElement
      title={props.title}
      description={props.description}
      tags={props.tags}
    >
      {props.replacementText}
    </AlternativePopoverElement>
  );
};

const stuff = (props) => <RealPopoverApp {...props} />;
export default stuff;
