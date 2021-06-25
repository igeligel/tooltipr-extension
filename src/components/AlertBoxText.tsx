import React from "react";
import { Text } from "@chakra-ui/react";

export const AlertBoxText: React.FC = (props) => {
  return (
    <Text as={"span"} margin={0} fontSize={"sm"}>
      {props.children}
    </Text>
  );
};
