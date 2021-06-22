import { useEffect, useState } from "react";

export const useCookies = () => {
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);

  useEffect(() => {
    chrome.cookies.getAll({ domain: "127.0.0.1" }, (cookies) => {
      setCookies(cookies);
    });
  }, []);

  return [cookies]
}
