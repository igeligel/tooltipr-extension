import axios from "axios";

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
    "http://127.0.0.1:3000/api/extension/getCurrentUser",
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
