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
import { setAccountModeToStore } from "./configuration/accountMode";
import { OrganizationGlossariesManager } from "./pages/OrganizationGlossariesManager";
import { PersonalGlossariesManager } from "./pages/PersonalGlossariesManager";

const Popup = () => {
  let history = useHistory();
  const didMount = useRef(null);
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.length === 0) {
      return;
    }

    const fetchUser = async () => {
      let userResponse = null;
      try {
        userResponse = await getCurrentUser({ cookies });
      } catch (error) {
        await setAccountModeToStore("ANONYMOUS");
        history.push("/login");
      }
      if (userResponse?.data?.results) {
        await setAccountModeToStore("USER");
        history.push("/home");
      } else {
        await setAccountModeToStore("ANONYMOUS");
        history.push("/login");
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
          <Route
            exact
            path="/organization-glossaries-manager"
            component={OrganizationGlossariesManager}
          />
          <Route
            exact
            path="/personal-glossaries-manager"
            component={PersonalGlossariesManager}
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
