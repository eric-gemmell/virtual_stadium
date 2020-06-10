import React, { Component } from "react";
import CarouselMain from "./carousel/carouselMain";
import DatePicker from "react-datepicker";
import ResponsiveTextInput from "./textInput/responsiveTextInput";
import "react-datepicker/dist/react-datepicker.css";
import logo from "./images/logo.png";
import SyncLoader from "react-spinners/SyncLoader";
import copy from "copy-to-clipboard";  

class EventCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carouselIndex: 0,
			today: new Date(),
			startDate: new Date(),
			endDate: new Date(),
			eventName: null,
			eventNameStatus: "not ready",
			eventCreationStatus:"not created"
		}
		this.carouselChange = this.carouselChange.bind(this);
		this.setStartDate = this.setStartDate.bind(this);
		this.setEndDate = this.setEndDate.bind(this);
		this.setEventName = this.setEventName.bind(this);
		this.setEventNameStatus = this.setEventNameStatus.bind(this);
		this.createEvent = this.createEvent.bind(this);
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
	isReadyToCreateEvent(){
		if(this.state.startDate < this.state.today || this.state.endDate < this.state.startDate){ 
			return false;
		}
		if(this.state.eventNameStatus != "ready"){
			return false;
		}
		if(this.state.eventCreationStatus != "not created"){
			return false;
		}
		return true;
	}
	createEvent(){
		this.setState({eventCreationStatus:"creating event"});
		new Promise((resolve,reject) => setTimeout(resolve, 2000))
			.then(() => {
				this.setState({eventCreationStatus: "event created",link: "http://tinyurl.com/2g9mqh"});
			});
	}
	render() {
		return (
			<div className={"EventCreator"}>
				<div style={headerStyles(this.props.mobile)}>
					<img src={logo} style={logoStyles(this.props.mobile)}/>		
					<div style={headerTextStyles(this.props.mobile)}>Event Creator</div>
				</div>
				<div style={secondaryHeaderStyles}>
					Pick your stadium
				</div> 
				<div style={carouselStyles}>
					<CarouselMain carouselChange={this.carouselChange}/>
				</div>
				<ResponsiveTextInput placeHolder={"Event Name"} nameChange={this.setEventName} statusChange={this.setEventNameStatus} />
				<div style={secondaryHeaderStyles}>
					 Start Date and Time
				</div>
				<div style={dateStyles}>
					<DatePicker
						selected={this.state.startDate}
						onChange={date => this.setStartDate(date)}
						minDate={this.state.today}
						maxDate={addDays(this.state.today,30)}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						timeCaption="time"
						dateFormat="MMMM d, yyyy h:mm aa"
					/>
				</div>
				<div style={secondaryHeaderStyles}> 
					End Date and Time 
				</div>
				<div style={dateStyles}>
					<DatePicker
						selected={this.state.endDate}
						onChange={date => this.setEndDate(date)}
						minDate={this.state.today}
						maxDate={addDays(this.state.today,30)}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						timeCaption="time"
						dateFormat="MMMM d, yyyy h:mm aa"
					/>
				</div>
				{this.state.link && 
				<div style={{"margin":"5% 3% 0% 3%",height:"20px",position:"relative",borderBottom:"1px solid #666666"}}>
					<a style={linkStyles} href={this.state.link}>
						{this.state.link}
					</a>
					<div style={{position:"absolute",right:"0px",bottom:"0px",width:"15%",height:"100%"}}>
						<button onClick={() => copy(this.state.link)} style={copyButtonStyles}>
							Copy
						</button>
					</div>
				</div>
		
				}
				<div style={{paddingLeft:"calc(3% + 5px)", paddingTop: "5%"}}>
					<button style={buttonStyles(this.isReadyToCreateEvent())} type="button" onClick={() => this.isReadyToCreateEvent() ? this.createEvent() : null }>
						{this.state.eventCreationStatus == "creating event" ?
							<SyncLoader size={10} margin={2} color={"white"}/>
							:
							this.state.eventCreationStatus == "event created" ?
							"Event Created Already"
							:
							"Create Event"
						}
					</button>
				</div>
			</div>
		);
	}
}

export default EventCreator;
let headerStyles = (mobile) => {
	return {
		backgroundColor:"#333",
		paddingBottom: (mobile ? "2%": "0.5%"),
		paddingTop: (mobile ?"2.5%":"1%"),
		overflow:"hidden"
	};
};
let logoStyles = (mobile) => {
	return {
		maxWidth:"20%",
		maxHeight:(mobile)?"50px":"70px",
		paddingLeft:"5%",
		float: "left",	
	};
};
let headerTextStyles = (mobile) => {
	return {
		fontFamily: "Poppins, sans-serif",
		textAlign: "center",
		fontSize: (mobile)?"2em":"3em",
		fontWeight: "600",
		color: "white",
		textShadow: "0 1px 2px rgba(255,255,255,.3)",
		float:"left",
		width:"75%",
	};
};
let secondaryHeaderStyles = {
	fontFamily: "Poppins, sans-serif",
	fontSize: "13px",
	color:"#666666",
	lineHeight: "1.5",
	paddingLeft: "calc(3% + 5px)",
	paddingTop:"2%",
	paddingBottom:"2%",
	fontWeight:"400",
};
let carouselStyles = {

};
let dateStyles = {
	paddingTop:"5px",
	paddingLeft:"3%",
	paddingRight:"3%"
};
function  buttonStyles(active){
	return {
		padding:"0.7rem 1.4rem",
		borderRadius:"0.15rem",
		boxSizing: "border-box",
		fontFamily:"Poppins,sans-serif",
		fontSize:"16px",
		textTransform:"uppercase",
		fontWeight:"400",
		color:"white",
		backgroundColor: active ? "#3369ff": "grey",
		boxShadow:"inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17)",
		textAlign:"center",
		border:"none",
	}
};
let linkStyles = {
	width:"85%",
	position:"absolute",
	bottom:"0px",
	fontFamily: "Poppins, sans-serif",
	fontSize: "13px",
	color:"#666666",
	fontWeight:"400",
	textDecoration:"none",
};
let copyButtonStyles = {
	height:"100%",
	width:"100%",
	borderRadius:"0.15rem",
	boxSizing: "border-box",
	fontFamily:"Poppins,sans-serif",
	fontSize:"13px",
	textTransform:"uppercase",
	fontWeight:"400",
	color:"white",
	backgroundColor: "grey",
	boxShadow:"inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17)",
	textAlign:"center",
	border:"none",
};
function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
