import React from "react";
import {
  Box,
  Heading,
  Icon,
  IconButton,
  VStack,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";
import { useEffect } from "react";
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
import { GlossaryManageItem } from "../../components/GlossaryManageItem";
import { useGlossaries } from "../../hooks/getGlossaries";

export const Home = () => {
  const history = useHistory();
  const [publicGlossaries] = usePublicGlossaries();
  const [accountMode, setAccountMode] = useState<null | AccountMode>(null);
  const [localConfiguration, setLocalConfiguration] =
    useState<null | LocalConfiguration>(null);

  const onReloadDictionariesClick = () => {
    chrome.runtime.sendMessage({
      command: "SYNCHRONIZE_GLOSSARIES",
    });
  };

  const [personalGlossaries, organizationGlossaries, contextTest] =
    useGlossaries({ enabled: accountMode !== null });

  const glossariesLoading = contextTest.isLoading;

  useEffect(() => {
    const fetchAccountMode = async () => {
      const accountMode = await getAccountModeFromStore();
      setAccountMode(accountMode);
    };
    fetchAccountMode();
  }, []);

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
          <GlossaryManageItem
            configuredGlossaries={localConfiguration?.publicGlossaries}
            glossaries={publicGlossaries}
            onButtonClick={() => {
              history.push("/public-glossaries-manager");
            }}
          />
        </Box>
        {accountMode === "USER" && (
          <Box width={"100%"}>
            <Heading as={"h2"} fontSize={"md"}>
              Organization Glossaries
            </Heading>
            <Skeleton
              isLoaded={!glossariesLoading}
              width={"100%"}
              marginTop={"2"}
              height="40px"
            >
              <GlossaryManageItem
                configuredGlossaries={
                  localConfiguration?.organizationGlossaries
                }
                glossaries={organizationGlossaries}
                onButtonClick={() => {
                  if (organizationGlossaries?.length === 0) {
                    window.open(
                      `${Configuration.DOMAIN}/app/team-glossaries/create`,
                      "_blank"
                    );
                  } else {
                    history.push("/organization-glossaries-manager");
                  }
                }}
              />
            </Skeleton>
          </Box>
        )}
        {accountMode === "USER" && (
          <Box width={"100%"}>
            <Heading as={"h2"} fontSize={"md"}>
              Personal Glossaries
            </Heading>
            <Skeleton
              isLoaded={!glossariesLoading}
              width={"100%"}
              marginTop={"2"}
              height="40px"
            >
              <GlossaryManageItem
                configuredGlossaries={localConfiguration?.personalGlossaries}
                glossaries={personalGlossaries}
                onButtonClick={() => {
                  if (personalGlossaries?.length === 0) {
                    window.open(
                      `${Configuration.DOMAIN}/app/personal-glossaries/create`,
                      "_blank"
                    );
                  } else {
                    history.push("/personal-glossaries-manager");
                  }
                }}
              />
            </Skeleton>
          </Box>
        )}
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
