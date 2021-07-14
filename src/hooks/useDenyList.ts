import { useEffect, useState } from "react";
import { getLocalConfiguration } from "../configuration/getLocalConfiguration";

type UseDenyList = [
  Array<string>,
  { loading: boolean; refetchEntries: () => void }
];

export const useDenyList = (): UseDenyList => {
  const [denyList, setDenyList] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchConfigurations = async () => {
    setLoading(true);
    const config = await getLocalConfiguration();
    setDenyList(config.denyList);
    setLoading(false);
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  return [denyList, { loading, refetchEntries: fetchConfigurations }];
};
