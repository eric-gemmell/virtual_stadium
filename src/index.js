import React from "react";
import ReactDOM from "react-dom";
import EventCreator from "./components/eventCreator";
import "./index.css";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<EventCreator mobile={window.innerWidth<600} windowSize={window.innerWidth}/>, wrapper) : false;

window.addEventListener('resize', windowResized);

function windowResized(){	
	wrapper ? ReactDOM.render(<EventCreator mobile={window.innerWidth<600} windowSize={window.innerWidth}/>, wrapper) : false;
}
