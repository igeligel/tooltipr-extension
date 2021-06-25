import {
  Box,
  Icon,
  IconButton,
  Heading,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
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
            <Heading fontSize={"lg"}>Log into your account</Heading>
            <Text fontWeight={"semibold"} marginTop={"1"}>
              <Text color={"gray.400"} as={"span"}>
                Do not have an account yet?
              </Text>{" "}
              <Link
                colorScheme={"cyan"}
                display={"inline"}
                href={`${Configuration.DOMAIN}/signup`}
              >
                Sign up
              </Link>
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
              Log In with tooltipr Account
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
              Continue without account
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
