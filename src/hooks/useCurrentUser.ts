import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/getCurrentUser";
import { useCookies } from "./useCookies";

export const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!cookies || cookies.length === 0) return;

    const fetchUser = async () => {
      setIsLoading(true);
      const user = await getCurrentUser({ cookies });
      setUser(user.data.results);
      setIsLoading(false);
    };
    fetchUser();
  }, [cookies]);

  return [user, { isLoading }];
};
