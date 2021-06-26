import { Box, Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { LocalConfiguration } from "../configuration/getLocalConfiguration";
import { Glossary } from "../types";

type GlossarySelectorItemProps = {
  localConfiguration: LocalConfiguration;
  publicGlossary: Glossary;
  publicGlossaries: Glossary[];
  onUpdated: (localConfiguration: LocalConfiguration) => void;
};

export const GlossarySelectorItem: React.FC<GlossarySelectorItemProps> = (
  props
) => {
  const {
    localConfiguration,
    publicGlossary,
    onUpdated: onUpdate,
    publicGlossaries,
  } = props;
  const isChecked = localConfiguration.publicGlossaries.some(
    (checkedGlossaries) => {
      return (
        checkedGlossaries.allowAll === true &&
        checkedGlossaries.uuid === publicGlossary.uuid
      );
    }
  );
  return (
    <Box
      marginTop={"2"}
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
      <Checkbox
        isChecked={isChecked}
        onChange={async (event: ChangeEvent<HTMLInputElement>) => {
          const allOtherPublicGlossaries =
            localConfiguration.publicGlossaries.filter(
              (publGlossary) => publGlossary.uuid !== publicGlossary.uuid
            );
          const currentGlossary = localConfiguration.publicGlossaries.find(
            (publGlossary) => publGlossary.uuid === publicGlossary.uuid
          );

          const toPush: LocalConfiguration = {
            ...localConfiguration,
            publicGlossaries: [
              ...allOtherPublicGlossaries,
              {
                allowList: [],
                denyList: [],
                terms: currentGlossary?.terms || [],
                uuid: publicGlossary.uuid,
                allowAll: event.target.checked,
              },
            ],
          };
          onUpdate(toPush);
        }}
      >
        {publicGlossary.title}
      </Checkbox>
    </Box>
  );
};
