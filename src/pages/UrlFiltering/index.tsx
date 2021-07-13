import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";

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
            colorScheme="teal"
            variant="solid"
            width={"100%"}
          >
            Add Filter Rule
          </Button>
        </Box>
        <Box flex={1} display={"flex"} alignItems={"center"}>
          <Box>dawaw</Box>
        </Box>
      </Box>
      <Box flexShrink={0} display={"flex"} width={"100%"}>
        <Box>Footer</Box>
      </Box>
    </Box>
  );
});
