import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import { Configuration } from "../../configuration";

export const Footer = () => {
  return (
    <Box>
      <Link
        colorScheme={"cyan"}
        display={"inline"}
        href={`${Configuration.DOMAIN}/faq/what-is-a-tooltipr-account`}
        target="_blank"
      >
        <Text>What is a tooltipr Account?</Text>
      </Link>
    </Box>
  );
};
