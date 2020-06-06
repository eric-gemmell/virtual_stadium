import React, { Component } from "react";
import * as d3 from "d3";

class ResponsiveTextInput extends Component {
	constructor(props){
		super(props);
		this.inputEnter = this.inputEnter.bind(this);	
		this.inputExit = this.inputExit.bind(this);	
		this.inputChange = this.inputChange.bind(this);	

		this.state = {
			value: ""
		};
	}
	render(){
		return (
			<div style={textInputStyles}>
				<div style={labelInputStyles}>
					Event Name
				</div>	
				<input type="input" style={inputStyles} placeholder={this.props.placeholder} value={this.state.value} 
					onChange={this.inputChange} onBlur={this.inputExit} onFocus={this.inputEnter}
				/>
				<div style={labelOnSelectStyles} ref={(border) => this.border = border}/>
			</div>
		);
	}
	inputChange(event){
		this.setState({value:event.target.value});
	}
	inputEnter(){
		console.log("inputEntered");
		d3.select(this.border)
			.transition()
			.duration(500)
			.style("width","100%");
	}
	inputExit(){
		console.log("Exited",this.state.value);
		if(this.state.value == ""){
			d3.select(this.border)
				.transition()
				.duration(500)
				.style("width","0%");
		}
	}
}
export default ResponsiveTextInput;

let textInputStyles = {
	
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
	display: "block",
	width: "100%",
	background: "transparent",
	fontFamily: "Poppins, sans-serif",
	fontSize: "18px",
	color: "#333333",
	lineHeight: "1.2",
	padding: "10px 5px",
	fontWeight: "600",
	border: "none",
	borderBottom: "2px solid rgb(217,217,217)"
};
let labelOnSelectStyles = {
	height: "2px",
	backgroundColor: "#212529",
	width:"0%",
	top:"-2px",
	position:"relative"
}
