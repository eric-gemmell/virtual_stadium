import EventCreator from "./components/eventCreator";
import React from "react";
import ReactDOM from "react-dom";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<EventCreator />, wrapper) : false;
