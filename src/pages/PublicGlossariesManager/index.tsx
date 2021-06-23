import React from "react";
import { Input, VStack, Checkbox } from "@chakra-ui/react";
import { usePublicGlossaries } from "../../hooks/usePublicGlossaries";

export const PublicGlossariesManager = () => {
  const [publicGlossaries] = usePublicGlossaries()
  return (
    <>
      <Input placeholder="Find something you are interested in" size={"sm"} />
      <VStack alignItems={"flex-start"} spacing={"0"}>
        {publicGlossaries.map((e) => {
          return <Checkbox defaultIsChecked>{e.title}</Checkbox>;
        })}
      </VStack>
    </>
  );
};
