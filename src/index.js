import React from "react";
import ReactDOM from "react-dom";
import EventCreator from "./components/eventCreator";
import "./index.css";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<EventCreator />, wrapper) : false;
