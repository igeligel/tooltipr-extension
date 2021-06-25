import React, { ChangeEvent, useState } from "react";
import { Input, VStack, Checkbox, Box, Button } from "@chakra-ui/react";
import { usePublicGlossaries } from "../../hooks/usePublicGlossaries";
import {
  getLocalConfiguration,
  LocalConfiguration,
  setLocalConfiguration as setLocalConfigurationGlobally,
} from "../../configuration/getLocalConfiguration";
import { useEffect } from "react";
import { GlossarySelectorItem } from "../../components/GlossarySelectorItem";
import { useHistory } from "react-router-dom";

export const PublicGlossariesManager = () => {
  const history = useHistory();
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
              history.push("/home");
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
            <VStack alignItems={"flex-start"} spacing={"1"}>
              {publicGlossaries.map((publicGlossary) => {
                return (
                  <GlossarySelectorItem
                    localConfiguration={localConfiguration}
                    publicGlossary={publicGlossary}
                    publicGlossaries={publicGlossaries}
                    onUpdated={async (newLocalConfiguration) => {
                      await setLocalConfigurationGlobally(
                        newLocalConfiguration
                      );
                      setLocalConfiguration(newLocalConfiguration);
                      chrome.runtime.sendMessage({
                        command: "SYNCHRONIZE_GLOSSARIES",
                      });
                    }}
                  />
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
