import axios from "axios";

type GetGlossariesProps = {
  cookies: chrome.cookies.Cookie[];
};

export const getGlossaries = async (input: GetGlossariesProps) => {
  const { cookies } = input;

  const dictionaryResponse = await axios.get<any>(
    "http://127.0.0.1:3000/api/extension/dictionaries",
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
