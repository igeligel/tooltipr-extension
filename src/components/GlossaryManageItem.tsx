import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { GlossarySelection } from "../configuration/getLocalConfiguration";
import { Glossary } from "../types";

type GlossaryManageItemProps = {
  onButtonClick: () => void;
  configuredGlossaries: Array<GlossarySelection> | null;
  glossaries: Array<Glossary>;
};

export const GlossaryManageItem: React.FC<GlossaryManageItemProps> = (
  props
) => {
  const { onButtonClick: onConfigureClick, configuredGlossaries } = props;

  const glossariesAvailable = !(
    !props.glossaries || props.glossaries.length === 0
  );

  let mainText = "No Glossaries found";
  let buttonText = "Set up";
  if (glossariesAvailable) {
    const glossariesActived = configuredGlossaries
      ? configuredGlossaries.filter((publicGlossary) => publicGlossary.allowAll)
          .length
      : 0;
    mainText = `${glossariesActived} of ${props.glossaries.length} Activated`;
    buttonText = "Configure";
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      background={"gray.50"}
      width={"100%"}
      borderRadius={"md"}
      paddingX={"4"}
      paddingY={"2"}
      role="group"
      transitionProperty={"all"}
      transitionDuration={"250ms"}
      transitionTimingFunction={"ease"}
      transitionDelay={"0s"}
      _hover={{ background: "cyan.50" }}
    >
      <Box>
        <Text
          fontSize={"md"}
          fontWeight={"semibold"}
          color={"gray.300"}
          transitionProperty={"all"}
          transitionDuration={"250ms"}
          transitionTimingFunction={"ease"}
          transitionDelay={"0s"}
          _groupHover={{ color: "gray.500" }}
        >
          {mainText}
        </Text>
      </Box>
      <Button
        colorScheme="cyan"
        size="xs"
        variant={"outline"}
        filter={"grayscale(1)"}
        transitionProperty={"all"}
        transitionDuration={"250ms"}
        transitionTimingFunction={"ease"}
        transitionDelay={"0s"}
        _groupHover={{ filter: "grayscale(0)" }}
        onClick={() => {
          onConfigureClick();
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
