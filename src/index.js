import React from "react";
import ReactDOM from "react-dom";
// import GlobalStyle from './styles/GlobalStyle';

import App from "./App";
import Authorization from "./Context/AuthContext";
import Chatcontextprovider from "./Context/ChatContext";
import { Toaster } from "react-hot-toast";
ReactDOM.render(
  <>
    {/* <GlobalStyle/> */}
    <Authorization>
      <Chatcontextprovider>
        {/* app pr user ki auth toh lagani padegi na vohi lagai hai */}
        <App />
        <Toaster />
      </Chatcontextprovider>
    </Authorization>
  </>,
  document.getElementById("root")
);
