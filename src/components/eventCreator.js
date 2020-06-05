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
		if(date > this.state.today){
			this.setState({startDate: date});
		}
	}
	setEndDate(date){
		if(date > this.state.today){
			this.setState({endDate: date});
		}
	}
	render() {
		return (
			<div className={"EventCreator"}>
				<h1> Pick Your Stadium </h1>
				<CarouselMain carouselChange={this.carouselChange}/>
				<br/>
				<h2> Select the start date of your event </h2>
				<DatePicker
					selected={this.state.startDate}
					onChange={date => this.setStartDate(date)}
					todayButton="Today"
					showTimeSelect
					minDate={this.state.today}
					timeFormat="HH:mm"
					timeIntervals={15}
					timeCaption="time"
					dateFormat="MMMM d, yyyy h:mm aa"
				/>
				<br/>
				<DatePicker
					selected={this.state.endDate}
					onChange={date => this.setEndDate(date)}
					minDate={this.state.startDate}
					todayButton="Today"
					showTimeSelect
					timeFormat="HH:mm"
					timeIntervals={15}
					timeCaption="time"
					dateFormat="MMMM d, yyyy h:mm aa"
				/>
				
			</div>
		);
	}
}

export default EventCreator;
