import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";
import { useEffect } from "react";
import { useCookies } from "../../hooks/useCookies";
import { getGlossaries } from "../../api/getGlossaries";
import { useState } from "react";
import { usePublicGlossaries } from "../../hooks/usePublicGlossaries";
import { RouterStore } from "../../router";
import {
  getLocalConfiguration,
  LocalConfiguration,
} from "../../configuration/getLocalConfiguration";

export const Home = () => {
  const [publicGlossaries] = usePublicGlossaries();
  const [cookies] = useCookies();
  const [personalGlossaries, setPersonalGlossaries] = useState(null);
  const [organizationGlossaries, setOrganizationGlossaries] = useState(null);
  const [localConfiguration, setLocalConfiguration] =
    useState<null | LocalConfiguration>(null);

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

  useEffect(() => {
    const fetchLocalConfiguration = async () => {
      const adwwadwad = await getLocalConfiguration();
      setLocalConfiguration(adwwadwad);
    };
    fetchLocalConfiguration();
  }, []);

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
        {/* <Heading as={"h2"} fontSize={"md"}>
          Organization Glossaries
        </Heading>
        <Box>
          <VStack alignItems={"flex-start"} spacing={"0"}>
            {organizationGlossaries?.map((e) => {
              return (
                <Checkbox isDisabled defaultIsChecked>
                  {e.title}
                </Checkbox>
              );
            })}
          </VStack>
        </Box> */}
        {/* <Heading as={"h2"} fontSize={"md"}>
          Personal Glossaries
        </Heading>
        <Box>
          <VStack alignItems={"flex-start"} spacing={"0"}>
            {personalGlossaries?.map((e) => {
              return (
                <Checkbox isDisabled defaultIsChecked>
                  {e.title}
                </Checkbox>
              );
            })}
          </VStack>
        </Box>*/}
        <Heading as={"h2"} fontSize={"md"}>
          Public Glossaries
        </Heading>
        <Box
          marginTop={"2"}
          display={"flex"}
          justifyContent={"space-between"}
          background={"gray.50"}
          width={"100%"}
          borderRadius={"md"}
          paddingX={"4"}
          paddingY={"2"}
          role="group"
          transitionProperty={"all"}
          transitionDuration={"250ms"}
          transitionTimingFunction={"ease"}
          transitionDelay={"0s"}
          _hover={{ background: "cyan.50" }}
        >
          <Box>
            <Text
              fontSize={"md"}
              fontWeight={"semibold"}
              color={"gray.300"}
              transitionProperty={"all"}
              transitionDuration={"250ms"}
              transitionTimingFunction={"ease"}
              transitionDelay={"0s"}
              _groupHover={{ color: "gray.500" }}
            >
              {localConfiguration
                ? localConfiguration.publicGlossaries.filter((e) => {
                    return e.allowAll;
                  }).length
                : 0}{" "}
              of {publicGlossaries.length} Activated
            </Text>
          </Box>
          <Button
            colorScheme="cyan"
            size="xs"
            variant={"outline"}
            filter={"grayscale(1)"}
            transitionProperty={"all"}
            transitionDuration={"250ms"}
            transitionTimingFunction={"ease"}
            transitionDelay={"0s"}
            _groupHover={{ filter: "grayscale(0)" }}
            onClick={() => {
              RouterStore.update((state) => ({
                ...state,
                currentRoute: "/home/public-glossaries-manager",
              }));
            }}
          >
            Configure
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
