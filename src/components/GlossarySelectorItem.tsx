import { Box, Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { LocalConfiguration } from "../configuration/getLocalConfiguration";
import { Glossary } from "../types";

type GlossarySelectorItemProps = {
  localConfiguration: LocalConfiguration;
  glossary: Glossary;
  onUpdated: (localConfiguration: LocalConfiguration) => void;
  localConfigurationKey: string;
};

export const GlossarySelectorItem: React.FC<GlossarySelectorItemProps> = (
  props
) => {
  const {
    localConfiguration,
    glossary,
    onUpdated: onUpdate,
    localConfigurationKey,
  } = props;
  const isChecked = localConfiguration[localConfigurationKey].some(
    (checkedGlossaries) => {
      return (
        checkedGlossaries.allowAll === true &&
        checkedGlossaries.uuid === glossary.uuid
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
          const allExcludedGlossaries = localConfiguration[
            localConfigurationKey
          ].filter((publGlossary) => publGlossary.uuid !== glossary.uuid);
          const currentGlossary = localConfiguration[
            localConfigurationKey
          ].find((publGlossary) => publGlossary.uuid === glossary.uuid);

          const toPush: LocalConfiguration = {
            ...localConfiguration,
            [localConfigurationKey]: [
              ...allExcludedGlossaries,
              {
                allowList: [],
                denyList: [],
                terms: currentGlossary?.terms || [],
                uuid: glossary.uuid,
                allowAll: event.target.checked,
              },
            ],
          };
          onUpdate(toPush);
        }}
      >
        {glossary.title}
      </Checkbox>
    </Box>
  );
};
