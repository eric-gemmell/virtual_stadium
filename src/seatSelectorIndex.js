import React from "react";
import ReactDOM from "react-dom";
import SeatSelector from "./components/seatSelector/seatSelectorMain";
import "./poppinsFont.css";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<SeatSelector mobile={window.innerWidth<600} windowSize={window.innerWidth}/>, wrapper) : false;

window.addEventListener('resize', windowResized);

function windowResized(){	
	wrapper ? ReactDOM.render(<SeatSelector mobile={window.innerWidth<600} windowSize={window.innerWidth}/>, wrapper) : false;
}
