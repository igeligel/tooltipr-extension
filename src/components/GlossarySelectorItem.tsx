import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { LocalConfiguration } from "../configuration/getLocalConfiguration";
import { Glossary } from "../types";

type GlossarySelectorItemProps = {
  localConfiguration: LocalConfiguration;
  publicGlossary: Glossary;
  onUpdated: (localConfiguration: LocalConfiguration) => void;
};

export const GlossarySelectorItem: React.FC<GlossarySelectorItemProps> = (
  props
) => {
  const { localConfiguration, publicGlossary, onUpdated: onUpdate } = props;
  const isChecked = localConfiguration.publicGlossaries.some(
    (checkedGlossaries) => {
      return (
        checkedGlossaries.allowAll === true &&
        checkedGlossaries.uuid === publicGlossary.uuid
      );
    }
  );
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={async (event: ChangeEvent<HTMLInputElement>) => {
        const allOtherPublicGlossaries =
          localConfiguration.publicGlossaries.filter((e) => {
            e.uuid !== publicGlossary.uuid;
          });
        const currentGlossary = localConfiguration.publicGlossaries.find(
          (e) => {
            e.uuid === publicGlossary.uuid;
          }
        );

        const toPush: LocalConfiguration = {
          ...localConfiguration,
          publicGlossaries: [
            ...allOtherPublicGlossaries,
            {
              selection: currentGlossary?.selection || [],
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
  );
};
