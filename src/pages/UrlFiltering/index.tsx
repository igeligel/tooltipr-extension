import { Box, Button, Icon, Text } from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { IllustrationFilter } from "../../components/IllustrationFilter";

export const UrlFiltering = forwardRef((props, ref) => {
  const history = useHistory();
  const [height, setHeight] = useState("");

  useEffect(() => {
    let mounted = true;

    // @ts-ignore
    if (ref.current) {
      setTimeout(() => {
        if (mounted) {
          setHeight("100vh");
        }
      }, 100);
    }

    return () => {
      mounted = false;
    };
  }, [ref]);

  return (
    <Box display={"flex"} flexDirection={"column"} height={height}>
      <Box flex={"1 0 auto"} display={"flex"} flexDirection={"column"}>
        <Box>
          <Button
            variant="link"
            onClick={() => {
              history.push("/home");
            }}
          >
            Back
          </Button>
        </Box>
        <Box marginTop={4}>
          <Button
            size={"xs"}
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="cyan"
            variant="solid"
            width={"100%"}
            background={"cyan.200"}
            _hover={{ background: "cyan.300" }}
          >
            Add Filter Rule
          </Button>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <IllustrationFilter width={"60%"} />
          <Text color={"gray.400"} fontSize={"md"} fontWeight={"light"}>
            Add a new rule and filter where to hide tooltips
          </Text>
          <Box marginTop={"2"}>
            <Button
              background={"cyan.200"}
              _hover={{ background: "cyan.300" }}
              colorScheme="cyan"
              variant="solid"
              size={"xs"}
            >
              Add Filter Rule
            </Button>
          </Box>
        </Box>
      </Box>
      {/* <Box flexShrink={0} display={"flex"} width={"100%"}>
        <Box>Footer</Box>
      </Box> */}
    </Box>
  );
});
