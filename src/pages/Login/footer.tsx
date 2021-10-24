import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import { Configuration } from "../../configuration";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Link
        colorScheme={"cyan"}
        display={"inline"}
        href={`${Configuration.DOMAIN}/faq/what-is-a-tooltipr-account`}
        target="_blank"
      >
        <Text>{t("login.footer.faq.primary")}</Text>
      </Link>
    </Box>
  );
};
