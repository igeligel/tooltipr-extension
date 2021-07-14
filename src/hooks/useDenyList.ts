import { useEffect, useState } from "react";
import { getLocalConfiguration } from "../configuration/getLocalConfiguration";

export const useDenyList = (): [Array<string>, { loading: boolean }] => {
  const [denyList, setDenyList] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchConfigurations = async () => {
      const config = await getLocalConfiguration();
      setDenyList(config.denyList);
      setLoading(false);
    };
    fetchConfigurations();
  }, []);

  return [denyList, { loading }];
};
