import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Icon,
  IconButton,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiSettings } from "react-icons/fi";
import { Logo } from "./components/Logo";

axios.defaults.withCredentials = true;

const Popup = () => {
  const didMount = useRef(null);
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [height, setHeight] = useState("");

  // useEffect(() => {
  //   chrome.browserAction.setBadgeText({ text: count.toString() });
  // }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  useEffect(() => {
    chrome.cookies.getAll({ domain: "localhost" }, (cookies) => {
      setCookies(cookies);
    });
  }, []);

  useEffect(() => {
    setUserLoaded(true);
    if (cookies.length === 0) {
      return;
    }

    const fetchUser = async () => {
      const userResponse = await axios.post<any>(
        "http://localhost:3000/api/users/queries/getCurrentUser",
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

      setUserLoaded(true);

      if (userResponse.data.error) return;

      setUser(userResponse.data.result);
    };
    fetchUser();
  }, [cookies]);

  useEffect(() => {
    if (didMount.current) {
      setTimeout(() => {
        setHeight("100vh");
      }, 100);
    }
  }, [didMount]);

  const changeBackground = () => {
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   const tab = tabs[0];
    //   if (tab.id) {
    //     chrome.tabs.sendMessage(
    //       tab.id,
    //       {
    //         color: "#555555",
    //       },
    //       (msg) => {
    //         console.log("result message:", msg);
    //       }
    //     );
    //   }
    // });
    // chrome.tabs.query(
    //   { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    //   (tabs) => {
    //     const activeTab = tabs[0]
    //     const url = activeTab.url
    //     if (!url) return
    //     const { id: tabId } = activeTab;
    //     let code = `document.querySelector('h2')`;
    //     if (!tabId) return
    //     // http://infoheap.com/chrome-extension-tutorial-access-dom/
    //     chrome.tabs.executeScript(tabId, { code }, function (result) {
    //       // result has the return value from `code`
    //     });
    //   }
    // );
  };

  return (
    <ChakraProvider>
      <Box
        ref={didMount}
        width={"xs"}
        boxSizing={"border-box"}
        minHeight={"md"}
        maxHeight={"md"}
        display={"flex"}
        flexDirection={"column"}
        padding={"4"}
      >
        {!userLoaded && (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Spinner size="lg" />
          </Box>
        )}
        {userLoaded && (
          <Box display={"flex"} flexDirection={"column"} height={height}>
            <Box flex={"1 0 auto"} display={"flex"} flexDirection={"column"}>
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Icon h={8} w={8} as={Logo} marginRight={"2"} />
                  <Text
                    fontFamily={"heading"}
                    fontWeight="600"
                    textDecoration="none"
                    color={"gray.800"}
                    fontSize={"md"}
                  >
                    tooltipr
                  </Text>
                </Box>
                <Box>
                <IconButton aria-label="Settings"  size="md" variant={"ghost"} icon={<FiSettings />} />
                </Box>
              </Box>
              <Box
                display={"flex"}
                flex={"1"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Heading fontSize={"lg"}>Log into your account</Heading>
                <Text fontWeight={"semibold"} marginTop={"1"}>
                  <Text color={"gray.400"} as={"span"}>
                    Do not have an account yet?
                  </Text>{" "}
                  <Link
                    colorScheme={"cyan"}
                    display={"inline"}
                    href={"http://localhost:3000/signup"}
                  >
                    Sign up
                  </Link>
                </Text>
                <Button
                  marginTop={"4"}
                  size={"sm"}
                  colorScheme={"cyan"}
                  bg={"cyan.200"}
                  _hover={{
                    bg: "cyan.300",
                  }}
                  px={10}
                  width={"100%"}
                  // onClick={props.onPrimaryButtonClick}
                  onClick={() => {
                    window.open("http://localhost:3000/login", "_blank");
                  }}
                >
                  Log In with tooltipr Account
                </Button>

                <Text marginTop={"4"}>
                  <Link
                    colorScheme={"cyan"}
                    display={"inline"}
                    href={"http://localhost:3000/login"}
                  >
                    Forgot your password?
                  </Link>
                </Text>
              </Box>
            </Box>
            <Box
              flexShrink={0}
              display={"flex"}
              width={"100%"}
              justifyContent={"center"}
            >
              <Link
                colorScheme={"cyan"}
                display={"inline"}
                href={"http://localhost:3000/faq/what-is-a-tooltipr-account"}
                target="_blank"
              >
                <Text>What is a tooltipr Account?</Text>
              </Link>
            </Box>

            {/* <p>{JSON.stringify(user)}</p>
            <ul style={{ minWidth: "700px" }}>
              <li>Current URL: {currentURL}</li>
              <li>Current Time: {new Date().toLocaleTimeString()}</li>
            </ul>
            <button
              onClick={() => setCount(count + 1)}
              style={{ marginRight: "5px" }}
            >
              count up
            </button>
            <button onClick={changeBackground}>change background</button> */}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
