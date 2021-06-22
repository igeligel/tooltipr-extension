import React from "react";
import {
  Box,
  Checkbox,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";
import { useEffect } from "react";
import { useCookies } from "../../hooks/useCookies";
import { getGlossaries } from "../../api/getGlossaries";
import { useState } from "react";

export const Home = () => {
  const [cookies] = useCookies();
  const [personalGlossaries, setPersonalGlossaries] = useState(null);
  const [organizationGlossaries, setOrganizationGlossaries] = useState(null);

  const onReloadDictionariesClick = () => {
    chrome.runtime.sendMessage({
      command: "SYNCHRONIZE_GLOSSARIES",
    });
  };

  useEffect(() => {
    if (!cookies) return;

    const getGlossariesFn = async () => {
      const glossariesResponse = await getGlossaries({ cookies });
      setPersonalGlossaries(glossariesResponse.data.results.personalGlossaries);
      setOrganizationGlossaries(
        glossariesResponse.data.results.organizationGlossaries
      );
    };
    getGlossariesFn();
  }, [cookies]);

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
        <Heading as={"h2"} fontSize={"md"}>
          Organization Glossaries
        </Heading>
        <Box>
          <VStack alignItems={"flex-start"} spacing={"0"}>
            {organizationGlossaries?.map((e) => {
              return <Checkbox defaultIsChecked>{e.title}</Checkbox>;
            })}
          </VStack>
        </Box>
        <Heading as={"h2"} fontSize={"md"}>
          Personal Glossaries
        </Heading>
        <Box>
          <VStack alignItems={"flex-start"} spacing={"0"}>
            {personalGlossaries?.map((e) => {
              return <Checkbox defaultIsChecked>{e.title}</Checkbox>;
            })}
          </VStack>
        </Box>
        <Heading as={"h2"} fontSize={"md"}>
          Public Glossaries
        </Heading>
        <Box>
          <VStack alignItems={"flex-start"} spacing={"0"}>
            {[{title: 'adwadwawd'}].map((e) => {
              return <Checkbox defaultIsChecked>{e.title}</Checkbox>;
            })}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
