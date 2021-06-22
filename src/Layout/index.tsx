import { Box } from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState } from "react";

// Not usable yet
export const Layout = forwardRef((props, ref) => {
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
        {/* @ts-ignore */}
        {React.cloneElement(props.children, { ...props })}
      </Box>
      <Box
        flexShrink={0}
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
      >
        {/* <Link
          colorScheme={"cyan"}
          display={"inline"}
          href={"http://127.0.0.1:3000/faq/what-is-a-tooltipr-account"}
          target="_blank"
        >
          <Text>What is a tooltipr Account?</Text>
        </Link> */}
      </Box>
    </Box>
  );
});
