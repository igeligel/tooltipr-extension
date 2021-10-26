import React from "react";
import {
  Box,
  Heading,
  Icon,
  IconButton,
  VStack,
  Link,
  Skeleton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  HStack,
} from "@chakra-ui/react";
import { FiMoreHorizontal, FiRefreshCcw } from "react-icons/fi";
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
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t } = useTranslation();
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

  const [user, currentUserContext] = useCurrentUser();

  const currentUserLoading = currentUserContext.isLoading;

  const [personalGlossaries, organizationGlossaries, contextTest] =
    useGlossaries({ enabled: accountMode !== null && user });

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
      <HStack justifyContent={"flex-end"}>
        <IconButton
          onClick={onReloadDictionariesClick}
          aria-label="Reload glossaries"
          icon={<Icon as={FiRefreshCcw} />}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              onClick={() => {}}
              aria-label="Show Options"
              icon={<Icon as={FiMoreHorizontal} />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Heading fontSize={"lg"}>More Settings</Heading>
            </PopoverHeader>
            <PopoverBody>
              <Link
                onClick={() => {
                  history.push("/url-filtering");
                }}
                fontSize={"md"}
                color={"cyan.800"}
              >
                URL Filtering
              </Link>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <VStack spacing={"3"} alignItems={"flex-start"}>
        <Box width={"100%"}>
          <Heading as={"h2"} fontSize={"md"}>
            {t("home.publicGlossary")}
          </Heading>
          <GlossaryManageItem
            configuredGlossaries={localConfiguration?.publicGlossaries}
            glossaries={publicGlossaries}
            onButtonClick={() => {
              history.push("/public-glossaries-manager");
            }}
          />
        </Box>
        {accountMode === "USER" && user?.organization?.maxUserCount !== 1 && (
          <Box width={"100%"}>
            <Heading as={"h2"} fontSize={"md"}>
              Organization Glossaries
            </Heading>
            <Skeleton
              isLoaded={!glossariesLoading && !currentUserLoading}
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
