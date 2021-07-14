import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Icon,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import micromatch from "micromatch";
import {
  getLocalConfiguration,
  setLocalConfiguration,
} from "../../../configuration/getLocalConfiguration";

export const UrlFilteringCreate: React.FC = () => {
  const history = useHistory();
  const [globPattern, setGlobPattern] = useState<string>("");
  const [testText, setTestText] = useState<string>("");

  return (
    <Box>
      <Box>
        <Button
          variant="link"
          onClick={() => {
            history.push("/url-filtering");
          }}
        >
          Back
        </Button>
      </Box>
      <Box width={"100%"}>
        <Input
          marginTop={2}
          width={"100%"}
          value={globPattern}
          onChange={(event) => setGlobPattern(event.target.value)}
          placeholder={"https://google.com/admin/**"}
        />
        <Box marginTop={2}>
          <Button
            size={"xs"}
            width={"100%"}
            colorScheme={"cyan"}
            backgroundColor={"cyan.200"}
            _hover={{
              backgroundColor: "cyan.300",
            }}
            onClick={async () => {
              const localConfiguration = await getLocalConfiguration();
              localConfiguration.denyList.push(globPattern);
              await setLocalConfiguration(localConfiguration);
              history.push(`/url-filtering`);
            }}
          >
            Exclude sites matching the pattern
          </Button>
        </Box>
        <Box marginTop={4}>
          <Heading fontSize={"lg"}>Test strings</Heading>
          <Text fontSize={"sm"} color={"gray.300"} fontWeight={"semibold"}>
            Enter strings here to test against the glob. Do not click outside
            the extension, it might close without the changes!
          </Text>
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          borderColor={"gray.300"}
          borderWidth={"1px"}
          borderRadius={"md"}
          marginTop={2}
        >
          <Box
            flex={1}
            paddingY={1}
            display={"flex"}
            flexDirection={"column"}
            backgroundColor={"gray.100"}
          >
            {globPattern !== "" &&
              testText.split("\n").map((exampleString) => {
                const isMatch = micromatch.isMatch(exampleString, globPattern);
                return (
                  <Box
                    height={"16px"}
                    width={"100%"}
                    backgroundColor={"transparent"}
                    boxSizing={"border-box"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {isMatch && <Icon h={4} color={"cyan.400"} as={FiCheck} />}
                    {!isMatch && (
                      <Icon h={4} color={"red.400"} as={FiAlertTriangle} />
                    )}
                  </Box>
                );
              })}
          </Box>
          <Textarea
            border={"none"}
            lineHeight={"16px"}
            paddingY={1}
            paddingX={2}
            flex={6}
            width={"100%"}
            value={testText}
            onChange={(event) => {
              setTestText(event.target.value);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
