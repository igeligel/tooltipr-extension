import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { getCurrentUser } from "./api/getCurrentUser";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";

axios.defaults.withCredentials = true;

const Popup = () => {
  const didMount = useRef(null);
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUserLoaded(true);
    if (cookies.length === 0) {
      return;
    }

    const fetchUser = async () => {
      const userResponse = await getCurrentUser({cookies})

      setUserLoaded(true);

      setUser(userResponse.data.results);
    };
    fetchUser();
  }, [cookies]);

  useEffect(() => {
    chrome.cookies.getAll({ domain: "127.0.0.1" }, (cookies) => {
      setCookies(cookies);
    });
  }, []);

  return (
    <ChakraProvider>
      <Box
        ref={didMount}
        width={"sm"}
        boxSizing={"border-box"}
        minHeight={"lg"}
        maxHeight={"lg"}
        display={"flex"}
        flexDirection={"column"}
        padding={"4"}
      >
        {!userLoaded && (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Spinner size="lg" />
          </Box>
        )}
        {userLoaded && user && <Home />}
        {userLoaded && !user && <Login ref={didMount} />}
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
