import { Box, Icon, Heading, Link, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Trans } from "react-i18next";
import { useHistory } from "react-router-dom";
import { LoadingScreen } from "../../components/LoadingScreen";
import { Logo } from "../../components/Logo";
import { Configuration } from "../../configuration";
import {
  AccountMode,
  getAccountModeFromStore,
  setAccountModeToStore,
} from "../../configuration/accountMode";

export const Main = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accountMode, setAccountMode] = useState<AccountMode | null>(null);

  useEffect(() => {
    const fetchAccountMode = async () => {
      const accountMode = await getAccountModeFromStore();
      setAccountMode(accountMode);
      setIsLoading(false);
    };

    fetchAccountMode();
  }, []);

  useEffect(() => {
    if (accountMode === "ANONYMOUS" || accountMode === "USER") {
      history.push("/home");
    }
  }, [accountMode]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <Icon h={8} w={8} as={Logo} marginRight={"2"} />
              <Text
                fontFamily={"heading"}
                fontWeight="600"
                textDecoration="none"
                color={"gray.800"}
                fontSize={"md"}
              >
                tooltipr
              </Text>
            </Box>
            {/* <Box>
              <IconButton
                aria-label="Settings"
                size="md"
                variant={"ghost"}
                icon={<FiSettings />}
              />
            </Box> */}
          </Box>
          <Box
            display={"flex"}
            flex={"1"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            {/* Log into your account */}
            <Heading fontSize={"lg"}>
              <Trans
                i18nKey="login.loginHeading"
                defaults="Log into your account"
              />
            </Heading>
            <Text fontWeight={"semibold"} marginTop={"1"}>
              <Trans
                i18nKey="login.noAccountSignup"
                defaults="<mainText>Do not have an account yet?</mainText> <signupLink>Sign up</signupLink>"
                components={{
                  mainText: <Text color={"gray.400"} as={"span"} />,
                  signupLink: (
                    <Link
                      colorScheme={"cyan"}
                      display={"inline"}
                      href={`${Configuration.DOMAIN}/signup`}
                    />
                  ),
                }}
              />
            </Text>
            <Button
              marginTop={"4"}
              size={"sm"}
              colorScheme={"cyan"}
              bg={"cyan.200"}
              _hover={{
                bg: "cyan.300",
              }}
              px={10}
              width={"100%"}
              // onClick={props.onPrimaryButtonClick}
              onClick={() => {
                window.open(`${Configuration.DOMAIN}/login`, "_blank");
              }}
            >
              <Trans
                i18nKey="login.loginButton"
                defaultValue="Log In with tooltipr Account"
              />
            </Button>

            <Button
              size={"sm"}
              marginTop={"2"}
              variant={"outline"}
              colorScheme={"cyan"}
              display={"inline"}
              onClick={async () => {
                await setAccountModeToStore("ANONYMOUS");
                setAccountMode("ANONYMOUS");
              }}
            >
              <Trans
                i18nKey="login.continueWithoutAccount"
                defaultValue="Continue without account"
              />
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
