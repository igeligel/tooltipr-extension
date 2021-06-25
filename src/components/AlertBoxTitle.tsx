import React from "react";
import { Text } from "@chakra-ui/react";

export const AlertBoxTitle: React.FC = (props) => {
  return (
    <Text as={"span"} margin={0} fontWeight={"semibold"} fontSize={"md"}>
      {props.children}
    </Text>
  );
};
