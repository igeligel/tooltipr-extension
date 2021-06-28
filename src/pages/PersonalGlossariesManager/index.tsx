import {
  Box,
  Button,
  Input,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlossarySelectorItem } from "../../components/GlossarySelectorItem";
import {
  AccountMode,
  getAccountModeFromStore,
} from "../../configuration/accountMode";
import {
  getLocalConfiguration,
  LocalConfiguration,
  setLocalConfiguration as setLocalConfigurationGlobally,
} from "../../configuration/getLocalConfiguration";
import { useGlossaries } from "../../hooks/getGlossaries";

export const PersonalGlossariesManager = () => {
  const history = useHistory();
  const [localConfiguration, setLocalConfiguration] =
    useState<null | LocalConfiguration>(null);
  const [accountMode, setAccountMode] = useState<null | AccountMode>(null);

  useEffect(() => {
    const fetchAccountMode = async () => {
      const accountMode = await getAccountModeFromStore();
      setAccountMode(accountMode);
    };

    const fetchLocalConfiguration = async () => {
      const _localConfiguration = await getLocalConfiguration();
      setLocalConfiguration(_localConfiguration);
    };
    fetchAccountMode();
    fetchLocalConfiguration();
  }, []);

  const [personalGlossaries, _, contextTest] = useGlossaries({
    enabled: accountMode !== null,
  });

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
        <Box marginTop={"2"}>
          <Skeleton
            height={"32px"}
            isLoaded={!!localConfiguration && !!personalGlossaries}
          >
            <Input
              placeholder="Find something you are interested in"
              size={"sm"}
            />
          </Skeleton>
          <SkeletonText
            noOfLines={4}
            spacing="4"
            isLoaded={!!localConfiguration && !!personalGlossaries}
          >
            {localConfiguration && personalGlossaries && (
              <VStack alignItems={"flex-start"} spacing={"1"}>
                {personalGlossaries.map((personalGlossary) => {
                  return (
                    <GlossarySelectorItem
                      key={personalGlossary.uuid}
                      localConfiguration={localConfiguration}
                      glossary={personalGlossary}
                      localConfigurationKey={"personalGlossaries"}
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
            )}
          </SkeletonText>
        </Box>
      </Box>
    </>
  );
};
