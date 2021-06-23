import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { getCurrentUser } from "./api/getCurrentUser";
import { useCookies } from "./hooks/useCookies";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";
import { RouterStore } from "./router";

axios.defaults.withCredentials = true;

const Popup = () => {
  const currentRoute = RouterStore.useState((state) => state.currentRoute);
  const didMount = useRef(null);
  const [cookies] = useCookies();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState(null);

  useEffect(() => {
    if (cookies.length === 0) {
      return;
    }

    const fetchUser = async () => {
      const userResponse = await getCurrentUser({ cookies });

      setUserLoaded(true);
      if (userResponse.data.results) {
        RouterStore.update((state) => {
          return {
            ...state,
            currentRoute: "/home",
          };
        });
      }
    };
    fetchUser();
  }, [cookies]);

  useEffect(() => {
    switch (currentRoute) {
      case "/home":
        return setCurrentView(<Home />);
      case "/login":
        return setCurrentView(<Login ref={didMount} />);

      default:
        return setCurrentView(<Login ref={didMount} />);
    }
  }, [currentRoute]);

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
        {userLoaded && currentView}
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
