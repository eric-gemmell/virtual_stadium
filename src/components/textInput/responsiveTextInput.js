import React, { Component } from "react";
import * as d3 from "d3";
import "./responsiveTextInput.css";
import SyncLoader from "react-spinners/SyncLoader";

class ResponsiveTextInput extends Component {
	constructor(props){
		super(props);
		this.inputEnter = this.inputEnter.bind(this);	
		this.inputExit = this.inputExit.bind(this);	
		this.inputChange = this.inputChange.bind(this);	

		this.state = {
			textState:"not ready",
			value: ""
		};
	}
	render(){
		return (
			<div style={textInputStyles}>
				<div style={labelInputStyles}>
					Event Name
				</div>	
				<div style={{width:"100%",padding:"10px 5px",height:"45px", boxSizing:"border-box"}}>
					<input className={"textInput"} type="input" style={inputStyles} placeholder={this.props.placeHolder} value={this.state.value} 
						onChange={this.inputChange} onBlur={this.inputExit} onFocus={this.inputEnter}
					/>
					{this.state.textState == "checking name" &&
					<div style={{width:"10%",height:"25px", float:"right"}}>
						<div style={{float:"right"}}>
							<SyncLoader size={5} margin={1} color={"#666666"}/>
						</div>
					</div>
					}
					{this.state.textState == "rejected"  &&
					<div style={{width:"10%",height:"25px",float: "left"}}>
						<svg style={{width:"50%",height:"25px", float:"right"}}>
							<path fill="#666666"
								d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z">
								<title>The name provided has either been taken or does not adhere to the norms of event naming</title>
							</path>
						</svg>
					</div>
					}
				</div>
				<div style={labelDeselectStyles}/>
				<div style={labelOnSelectStyles} ref={(border) => this.border = border}/>
			</div>
		);
	}
	
	setTextState(newState){
		this.props.statusChange(newState);
		this.setState({textState:newState});
	}
	inputChange(event){
		this.setState({value:event.target.value});
	}
	inputEnter(){
		this.setTextState("not ready");
		d3.select(this.border)
			.transition()
			.duration(500)
			.style("width","100%");
	}
	inputExit(){
		if(this.state.value == ""){
			this.setTextState("not ready");
			d3.select(this.border)
				.transition()
				.duration(500)
				.style("width","0%");
		}
		else{
			this.setTextState("checking name");
			new Promise((resolve,reject) => setTimeout((Math.random()<0.5)?resolve:reject, 1000))
				.then(() => this.setTextState("ready"),() => this.setTextState("rejected"));
		}
	}
}
export default ResponsiveTextInput;

let textInputStyles = {
	boxSizing: "border-box",
	padding:"3%",	
	width:"100%"
};
let labelInputStyles = {
	fontFamily: "Poppins,  sans-serif",
	fontSize: "13px",
	color: "#666666",
	lineHeight: "1.5",
	paddingLeft: "5px",
	fontWeight: "400",
};
let inputStyles = {
	boxSizing: "border-box",
	//display: "block",
	width: "90%",
	height:"100%",
	float:"left",
	background: "transparent",
	fontFamily: "Poppins, sans-serif",
	fontSize: "18px",
	color: "#666666",
	//lineHeight: "1.2",
	//padding: "10px 5px",
	fontWeight: "600",
	border: "none"
};

let labelDeselectStyles = {
	boxSizing: "border-box",
	height: "2px",
	backgroundColor: "rgb(217,217,217)",
	width:"100%",
	top:"-2px",
	position:"relative"
}
let labelOnSelectStyles = {
	boxSizing: "border-box",
	height: "2px",
	backgroundColor: "#666666",
	width:"0%",
	top:"-4px",
	position:"relative"
}
