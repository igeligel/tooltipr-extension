import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

export const LoadingScreen = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Spinner size="lg" />
    </Box>
  );
};
