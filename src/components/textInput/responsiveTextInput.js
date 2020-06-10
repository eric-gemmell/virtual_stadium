/** @jsx jsx */
import React, { Component } from "react";
import * as d3 from "d3";
import SyncLoader from "react-spinners/SyncLoader";
import { css, jsx } from '@emotion/core';

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
					<input className={"textInput"} type="input" 
						css={inputStyles((this.state.textState == "rejected") ? "#cf7677":"rgb(217,217,217)")}
						placeholder={this.state.textState == "rejected" ? "Name taken or rejected":this.props.placeHolder} value={this.state.value} 
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
						<svg style={{width:"25px",height:"25px", float:"right"}} viewBox=" 5 5 15 15" xmlns="http://www.w3.org/2000/svg">
							<path fill="#cf7677"
								d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z">
							</path>
						</svg>
					</div>
					}
					{this.state.textState == "ready"  &&
					<div style={{width:"10%",height:"25px",float: "left"}}>
						<svg style={{width:"25px",height:"25px", float:"right"}} viewBox=" 3 3 18 18" xmlns="http://www.w3.org/2000/svg">
							<path fill="#6ebf6d"d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z">
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
				.then(() => this.setTextState("ready"),() => {
					this.setState({value:""});
					this.setTextState("rejected");
				});
		}
	}
}
export default ResponsiveTextInput;

let textInputStyles = {
	boxSizing: "border-box",
	padding:"10px 3%",	
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
function inputStyles(placeholderColor){
	return css`
		box-sizing: border-box;
		width: 90%;
		height:100%;
		float:left;
		background: transparent;
		font-family: "Poppins", sans-serif;
		font-size: 18px;
		color: #666666;
		font-weight: 600;
		border: none;
		::placeholder {
			color: ${placeholderColor};
			opacity: 1;
		}
	`
}

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
