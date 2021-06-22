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
import { FiSettings } from "react-icons/fi";
import { Logo } from "../../components/Logo";

export const Main = () => {
  return (
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
        <Box>
          <IconButton
            aria-label="Settings"
            size="md"
            variant={"ghost"}
            icon={<FiSettings />}
          />
        </Box>
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
            href={"http://127.0.0.1:3000/signup"}
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
            window.open("http://127.0.0.1:3000/login", "_blank");
          }}
        >
          Log In with tooltipr Account
        </Button>

        <Text marginTop={"4"}>
          <Link
            colorScheme={"cyan"}
            display={"inline"}
            href={"http://127.0.0.1:3000/login"}
          >
            Forgot your password?
          </Link>
        </Text>
      </Box>
    </>
  );
};
