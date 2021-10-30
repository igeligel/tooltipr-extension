import {
  Box,
  Button,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiDelete, FiEdit, FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { IllustrationFilter } from "../../components/IllustrationFilter";
import {
  getLocalConfiguration,
  setLocalConfiguration,
} from "../../configuration/getLocalConfiguration";
import { useDenyList } from "../../hooks/useDenyList";

export const UrlFiltering = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [height, setHeight] = useState("");
  const [denyList, denyListContext] = useDenyList();

  useEffect(() => {
    let mounted = true;

    // @ts-ignore
    if (ref.current) {
      setTimeout(() => {
        if (mounted) {
          setHeight("100vh");
        }
      }, 100);
    }

    return () => {
      mounted = false;
    };
  }, [ref]);

  return (
    <Box display={"flex"} flexDirection={"column"} height={height}>
      <Box flex={"1 0 auto"} display={"flex"} flexDirection={"column"}>
        <Box>
          <Button
            variant="link"
            onClick={() => {
              history.push("/home");
            }}
          >
            {t("urlFiltering.backToHome")}
          </Button>
        </Box>
        {denyList?.length > 0 && (
          <>
            <Box marginTop={4}>
              <Button
                size={"xs"}
                leftIcon={<Icon as={FiPlus} />}
                colorScheme="cyan"
                variant="solid"
                width={"100%"}
                background={"cyan.200"}
                _hover={{ background: "cyan.300" }}
                onClick={() => {
                  history.push("/url-filtering/create");
                }}
              >
                {t("urlFiltering.addFilterRule")}
              </Button>
            </Box>
            <Table variant="simple" size={"xs"} marginTop={4}>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>{t("urlFiltering.pattern")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {denyList.map((globPattern) => {
                  return (
                    <Tr key={globPattern}>
                      <Td width={"40px"}>
                        <IconButton
                          size={"sm"}
                          aria-label="edit"
                          onClick={async () => {
                            const localConfiguration =
                              await getLocalConfiguration();
                            localConfiguration.denyList =
                              localConfiguration.denyList.filter((e) => {
                                return e !== globPattern;
                              });
                            await setLocalConfiguration(localConfiguration);
                            chrome.runtime.sendMessage({
                              command: "SYNCHRONIZE_DENYLIST",
                            });
                            denyListContext.refetchEntries();
                          }}
                        >
                          <Icon as={FiDelete} />
                        </IconButton>
                      </Td>
                      <Td>
                        <Text fontSize={"md"}>{globPattern}</Text>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </>
        )}
        {denyList?.length === 0 && (
          <Box
            flex={1}
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <IllustrationFilter width={"60%"} />
            <Text color={"gray.400"} fontSize={"md"} fontWeight={"light"}>
              {t("urlFiltering.addNewRuleHelperDescription")}
            </Text>
            <Box marginTop={"2"}>
              <Button
                background={"cyan.200"}
                _hover={{ background: "cyan.300" }}
                colorScheme="cyan"
                variant="solid"
                size={"xs"}
                onClick={() => {
                  history.push("/url-filtering/create");
                }}
              >
                {t("urlFiltering.addFilterRule")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {/* <Box flexShrink={0} display={"flex"} width={"100%"}>
        <Box>Footer</Box>
      </Box> */}
    </Box>
  );
});
