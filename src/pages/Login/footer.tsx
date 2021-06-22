import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box>
      <Link
        colorScheme={"cyan"}
        display={"inline"}
        href={"http://127.0.0.1:3000/faq/what-is-a-tooltipr-account"}
        target="_blank"
      >
        <Text>What is a tooltipr Account?</Text>
      </Link>
    </Box>
  );
};
