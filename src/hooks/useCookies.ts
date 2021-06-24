import { useEffect, useState } from "react";
import { Configuration } from "../configuration";

export const useCookies = () => {
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);

  useEffect(() => {
    chrome.cookies.getAll({ domain: Configuration.HOST }, (cookies) => {
      setCookies(cookies);
    });
  }, []);

  return [cookies];
};
