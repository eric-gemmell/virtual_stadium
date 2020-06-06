import React, { Component } from "react";
import CarouselMain from "./carousel/carouselMain";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EventCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carouselIndex: 0,
			today: new Date(),
			startDate: new Date(),
			endDate: new Date()
		}
		this.carouselChange = this.carouselChange.bind(this);
		this.setStartDate = this.setStartDate.bind(this);
		this.setEndDate = this.setEndDate.bind(this);
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
	render() {
		return (
			<div className={"EventCreator"}>
				<div style={headerStyles}>
					<div> Pick Your Stadium </div>
				</div>
				<CarouselMain carouselChange={this.carouselChange}/>
				<div style={{}}>
					<div> Select the start date and time of your event </div>
					<DatePicker
						selected={this.state.startDate}
						onChange={date => this.setStartDate(date)}
						todayButton="Today"
						minDate={this.state.today}
						dateFormat="MMMM d, yyyy"
					/>
				</div>
				<div style={{}}>
					<div> Select the end date and time of your event </div>
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
	fontFamily: "Montserrat, sans-serif",
	fontSmoothing: "antialiased",
	textAlign: "center",
	fontSize: "2em",
	textTransform: "uppercase",
	fontWeight: "bold",
	color: "white",
	textShadow: "0 1px 2px rgba(255,255,255,.3)",
	backgroundColor:"#20232a",
	paddingBottom: "2%",
	paddingTop: "2.5%"
};
