import React from "react";
import { Box, Icon, VStack, Text } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

export const AlertBox: React.FC = (props) => {
  return (
    <Box
      marginTop={"2"}
      display={"flex"}
      background={"orange.100"}
      padding={"2"}
      paddingX={"4"}
      color={"gray.700"}
      borderRadius={"2"}
      paddingBottom={"3"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Box
          background={"orange.300"}
          borderRadius={"full"}
          padding={"2"}
          color={"white"}
          display={"inline-flex"}
        >
          <Icon as={FiAlertTriangle} height={4} width={4} />
        </Box>
      </Box>
      <VStack marginLeft={"3"} alignItems={"flex-start"} spacing={"0.5"}>
        {props.children}
      </VStack>
    </Box>
  );
};
