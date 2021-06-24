import axios from "axios";
import { Configuration } from "../configuration";

type GetGlossariesProps = {
  cookies: chrome.cookies.Cookie[];
};

export const getGlossaries = async (input: GetGlossariesProps) => {
  const { cookies } = input;

  const dictionaryResponse = await axios.get<any>(
    `${Configuration.DOMAIN}/api/extension/dictionaries`,
    {
      headers: {
        "anti-csrf": cookies.find(
          (cookie) => cookie.name === "tooltipr_sAntiCsrfToken"
        ).value,
        Cookie: cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
      withCredentials: true,
    }
  );
  return dictionaryResponse;
};
