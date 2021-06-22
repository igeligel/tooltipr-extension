import React from "react";
import { Box, Heading, Icon, IconButton, Text } from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";

export const Home = () => {
  const onReloadDictionariesClick = () => {
    chrome.runtime.sendMessage({
      command: "SYNCHRONIZE_GLOSSARIES",
    });
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <IconButton
          onClick={onReloadDictionariesClick}
          aria-label="Reload glossaries"
          icon={<Icon as={FiRefreshCcw} />}
        />
      </Box>
      <Box>
        <Heading as={"h2"} fontSize={"md"}>Organization Glossaries</Heading>
        <Box>

        </Box>
        <Text>wadwadwad</Text>
        <Heading as={"h2"} fontSize={"md"}>Personal Glossaries</Heading>
      </Box>
    </Box>
  );
};
