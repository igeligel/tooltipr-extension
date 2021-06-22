import { Box } from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState } from "react";
import { Footer } from "./footer";
import { Main } from "./main";

export const Login = forwardRef((props, ref) => {
  const [height, setHeight] = useState("");

  useEffect(() => {
    // @ts-ignore
    if (ref.current) {
      setTimeout(() => {
        setHeight("100vh");
      }, 100);
    }
  }, [ref]);

  return (
    <Box display={"flex"} flexDirection={"column"} height={height}>
      <Box flex={"1 0 auto"} display={"flex"} flexDirection={"column"}>
        <Main />
      </Box>
      <Box flexShrink={0} display={"flex"} width={"100%"}>
        <Footer />
      </Box>
    </Box>
  );
});
