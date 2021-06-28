import { useEffect, useState } from "react";
import { getGlossaries } from "../api/getGlossaries";
import { Glossary } from "../types";
import { useCookies } from "./useCookies";

type UseGlossariesProps = {
  enabled?: boolean;
};

type UseGlossariesResult = [
  Array<Glossary>,
  Array<Glossary>,
  { isLoading: boolean }
];

export const useGlossaries = (
  props: UseGlossariesProps
): UseGlossariesResult => {
  const enabled = props && "enabled" in props ? props.enabled : true;

  const [cookies] = useCookies();
  const [personalGlossaries, setPersonalGlossaries] = useState(null);
  const [organizationGlossaries, setOrganizationGlossaries] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (enabled) {
      if (!cookies || cookies.length === 0) return;
      const fetchGlossaries = async () => {
        try {
          setIsLoading(true);
          const glossariesResponse = await getGlossaries({ cookies });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setPersonalGlossaries(
            glossariesResponse.data.results.personalGlossaries
          );
          setOrganizationGlossaries(
            glossariesResponse.data.results.organizationGlossaries
          );
          setIsLoading(false);
        } catch (error) {
          if (error.response.data.error.code === "API_USER_NOT_AUTHENTICATED") {
            // Make awdadwwadwad
          }
          setIsLoading(false);
        }
      };
      fetchGlossaries();
    }
  }, [enabled, cookies]);

  // @ts-ignore
  return [personalGlossaries, organizationGlossaries, { isLoading }];
};
