import React from "react";
import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { FiAlertTriangle, FiRefreshCcw } from "react-icons/fi";
import { useEffect } from "react";
import { useCookies } from "../../hooks/useCookies";
import { getGlossaries } from "../../api/getGlossaries";
import { useState } from "react";
import { usePublicGlossaries } from "../../hooks/usePublicGlossaries";
import {
  getLocalConfiguration,
  LocalConfiguration,
} from "../../configuration/getLocalConfiguration";
import { useHistory } from "react-router-dom";
import {
  AccountMode,
  getAccountModeFromStore,
} from "../../configuration/accountMode";
import { AlertBox } from "../../components/AlertBox";
import { AlertBoxTitle } from "../../components/AlertBoxTitle";
import { AlertBoxText } from "../../components/AlertBoxText";
import { Configuration } from "../../configuration";

export const Home = () => {
  const history = useHistory();
  const [publicGlossaries] = usePublicGlossaries();
  const [cookies] = useCookies();
  const [accountMode, setAccountMode] = useState<null | AccountMode>(null);
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
      const accountMode = await getAccountModeFromStore();
      if (accountMode === "ANONYMOUS") {
        setAccountMode(accountMode);
        return;
      }
      try {
        const glossariesResponse = await getGlossaries({ cookies });
        setPersonalGlossaries(
          glossariesResponse.data.results.personalGlossaries
        );
        setOrganizationGlossaries(
          glossariesResponse.data.results.organizationGlossaries
        );
      } catch (error) {
        if (error.response.data.error.code === "API_USER_NOT_AUTHENTICATED") {
          // Make awdadwwadwad
        }
      }
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
      <VStack spacing={"3"} alignItems={"flex-start"}>
        <Box width={"100%"}>
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
                  ? localConfiguration.publicGlossaries.filter(
                      (publicGlossary) => publicGlossary.allowAll
                    ).length
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
                history.push("/public-glossaries-manager");
              }}
            >
              Configure
            </Button>
          </Box>
        </Box>
        {accountMode === "ANONYMOUS" && (
          <Box width={"100%"}>
            <Heading as={"h2"} fontSize={"md"}>
              Organization Glossaries
            </Heading>
            <AlertBox>
              <AlertBoxTitle>User Not Authorized!</AlertBoxTitle>
              <AlertBoxText>
                <Link
                  isExternal
                  color="cyan.700"
                  onClick={() => {
                    window.open(`${Configuration.DOMAIN}/signup`, "_blank");
                  }}
                >
                  Sign up
                </Link>{" "}
                to share glossaries with your colleagues.
              </AlertBoxText>
            </AlertBox>
          </Box>
        )}
        {accountMode === "ANONYMOUS" && (
          <Box width={"100%"}>
            <Heading as={"h2"} fontSize={"md"}>
              Personal Glossaries
            </Heading>
            <AlertBox>
              <AlertBoxTitle>User Not Authorized!</AlertBoxTitle>
              <AlertBoxText>
                Create your own glossaries. Just for you.{" "}
                <Link
                  isExternal
                  color="cyan.700"
                  onClick={() => {
                    window.open(`${Configuration.DOMAIN}/signup`, "_blank");
                  }}
                >
                  Sign up now!
                </Link>
              </AlertBoxText>
            </AlertBox>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
