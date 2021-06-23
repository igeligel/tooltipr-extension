import React, { ChangeEvent, useState } from "react";
import { Input, VStack, Checkbox, Box, Button } from "@chakra-ui/react";
import { usePublicGlossaries } from "../../hooks/usePublicGlossaries";
import { RouterStore } from "../../router";
import {
  getLocalConfiguration,
  LocalConfiguration,
  setLocalConfiguration as setLocalConfigurationGlobally,
} from "../../configuration/getLocalConfiguration";
import { useEffect } from "react";

export const PublicGlossariesManager = () => {
  const [localConfiguration, setLocalConfiguration] =
    useState<null | LocalConfiguration>(null);
  const [publicGlossaries] = usePublicGlossaries();

  useEffect(() => {
    const fetchLocalConfiguration = async () => {
      const _localConfiguration = await getLocalConfiguration();
      setLocalConfiguration(_localConfiguration);
    };
    fetchLocalConfiguration();
  }, []);

  return (
    <>
      <Box>
        <Box>
          <Button
            variant="link"
            onClick={() => {
              RouterStore.update((state) => ({
                ...state,
                currentRoute: "/home",
              }));
            }}
          >
            Back
          </Button>
        </Box>
        {localConfiguration && publicGlossaries ? (
          <Box marginTop={"2"}>
            {/* <Button
              onClick={async () => {
                await setLocalConfiguration({
                  organizationGlossariesAllowed: [],
                  publicGlossariesAllowed: [],
                  personalGlossariesAllowed: [],
                });
              }}
            >
              adwadwwad
            </Button>
            <Button>Load Config</Button> */}
            <Input
              placeholder="Find something you are interested in"
              size={"sm"}
            />
            <VStack alignItems={"flex-start"} spacing={"0"}>
              {publicGlossaries.map((publicGlossary) => {
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
                      const currentGlossary =
                        localConfiguration.publicGlossaries.find((e) => {
                          e.uuid === publicGlossary.uuid;
                        });

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
                      await setLocalConfigurationGlobally(toPush);
                      setLocalConfiguration(toPush);
                      chrome.runtime.sendMessage({
                        command: "SYNCHRONIZE_GLOSSARIES",
                      });
                    }}
                  >
                    {publicGlossary.title}
                  </Checkbox>
                );
              })}
            </VStack>
          </Box>
        ) : (
          <Box>Loading</Box>
        )}
      </Box>
    </>
  );
};
