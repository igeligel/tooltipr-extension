import axios from "axios";
import { Configuration } from "../configuration";

type GetCurrentUserProps = {
  cookies: chrome.cookies.Cookie[];
};

type GetCurrentUserResponse = {
  results: {
    id: number;
    name: string | null;
    email: string;
    role: string;
  };
};

export const getCurrentUser = async (props: GetCurrentUserProps) => {
  const { cookies } = props;
  const userResponse = await axios.post<GetCurrentUserResponse>(
    `${Configuration.DOMAIN}/api/extension/getCurrentUser`,
    {
      params: null,
      meta: {},
    },
    {
      headers: {
        "anti-csrf": cookies.find(
          (cookie) => cookie.name === "tooltipr_sAntiCsrfToken"
        ).value,
        Cookie: cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    }
  );
  return userResponse;
};
