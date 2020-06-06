import React, { Component } from "react";
import CarouselMain from "./carousel/carouselMain";
import DatePicker from "react-datepicker";
import ResponsiveTextInput from "./textInput/responsiveTextInput";
import "react-datepicker/dist/react-datepicker.css";
import logo from "./images/logo.png";

class EventCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carouselIndex: 0,
			today: new Date(),
			startDate: new Date(),
			endDate: new Date(),
			eventName: null,
			eventNameStatus: "not ready"
		}
		this.carouselChange = this.carouselChange.bind(this);
		this.setStartDate = this.setStartDate.bind(this);
		this.setEndDate = this.setEndDate.bind(this);
		this.setEventName = this.setEventName.bind(this);
		this.setEVentNameStatus = this.setEventNameStatus.bind(this);
	}
	carouselChange(carouselIndex){
		this.setState({carouselIndex});
	}
	setStartDate(date){
		this.setState({startDate: date});
	}
	setEndDate(date){
		this.setState({endDate: date});
	}
	setEventName(name){
		this.setState({eventName:name});
	}
	setEventNameStatus(newStatus){
		this.setState({eventNameStatus:newStatus});
	}
	render() {
		return (
			<div className={"EventCreator"}>
				<div style={headerStyles}>
					<img src={logo} style={logoStyles}/>		
					<div style={headerTextStyles}>Event Creator</div>
				</div>
				<div style={secondaryHeaderStyles}>
					-Pick your stadium
				</div> 
				<div style={carouselStyles}>
					<CarouselMain carouselChange={this.carouselChange}/>
				</div>
				<div style={secondaryHeaderStyles}>
					 -Pick a name for the event
				</div>
				<ResponsiveTextInput placeHolder={"Event Name"} nameChange={this.setEventName} statusChange={this.setEventNameStatus} />
				<div style={secondaryHeaderStyles}>
					 -Select start date and time
				</div>
				<div style={{}}>
					<DatePicker
						selected={this.state.startDate}
						onChange={date => this.setStartDate(date)}
						todayButton="Today"
						minDate={this.state.today}
						dateFormat="MMMM d, yyyy"
					/>
				</div>
				<div style={secondaryHeaderStyles}> 
					-Select end date and time 
				</div>
				<div style={{}}>
					<DatePicker
						selected={this.state.endDate}
						onChange={date => this.setEndDate(date)}
						minDate={this.state.today}
						todayButton="Today"
						dateFormat="MMMM d, yyyy"
					/>
				</div>
				
			</div>
		);
	}
}

export default EventCreator;
let headerStyles = {
	backgroundColor:"#333",
	paddingBottom: "2%",
	paddingTop: "2.5%",
	overflow:"hidden"
};
let headerTextStyles = {
	fontFamily: "Montserrat, sans-serif",
	fontSmoothing: "antialiased",
	textAlign: "center",
	fontSize: "1.8em",
	textTransform: "uppercase",
	fontWeight: "bold",
	color: "white",
	textShadow: "0 1px 2px rgba(255,255,255,.3)",
	float:"left",
	width:"85%"
};
let secondaryHeaderStyles = {
	fontFamily: '"Lucida Console", Monaco, monospace',
	fontSize: "1.2em",
	color:"#333",
//	backgroundColor:"#333",
	paddingLeft: "3%",
	paddingTop:"3px"
//	borderTop: "3px solid white"
};
let carouselStyles = {
	paddingTop: "3%",

};
let logoStyles = {
	width:"10%", 
	padding:"1%",
	float:"left"
}

