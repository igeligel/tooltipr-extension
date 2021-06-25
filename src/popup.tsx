import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { getCurrentUser } from "./api/getCurrentUser";
import { LoadingScreen } from "./components/LoadingScreen";
import { useCookies } from "./hooks/useCookies";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";
import { PublicGlossariesManager } from "./pages/PublicGlossariesManager";
import {
  MemoryRouter,
  Route,
  Switch,
  useHistory,
  Link,
} from "react-router-dom";

axios.defaults.withCredentials = true;

const Popup = () => {
  let history = useHistory();
  const didMount = useRef(null);
  const [cookies] = useCookies();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (cookies.length === 0) {
      return;
    }

    const fetchUser = async () => {
      let userResponse = null;
      try {
        userResponse = await getCurrentUser({ cookies });
      } catch (error) {}
      setUserLoaded(true);
      if (userResponse?.data?.results) {
        history.push("/home");
      }
    };
    fetchUser();
  }, [cookies]);

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
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/">
            <Login ref={didMount} />
          </Route>
          <Route exact path="/login">
            <Login ref={didMount} />
          </Route>
          <Route
            exact
            path="/public-glossaries-manager"
            component={PublicGlossariesManager}
          />
        </Switch>
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <Popup />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
