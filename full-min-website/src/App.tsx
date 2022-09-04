import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import "./index.css";

export const App = () => {
  const [accounts, setAccounts] = useState([]);

  return (
    <Box className={"overlay"}>
      <NavBar accounts={accounts} setAccounts={setAccounts}></NavBar>
      <Home accounts={accounts} setAccounts={setAccounts}></Home>
      <Box className={"moving-background"} />
    </Box>
  );
};
