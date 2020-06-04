import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import largeStadium from "./madridStadium.png";

class EventCreator extends Component {
	constructor() {
		super();
		this.state = {
			mobile: true,
			carouselIndex: 0,
			slides: [
				(<img src={largeStadium} alt={"Large Stadium"}/>),
				(<img src={largeStadium} alt={"Large Stadium"}/>),
				(<img src={largeStadium} alt={"Large Stadium"}/>),
			],

		}
		this.carouselChange = this.carouselChange.bind(this);
		
	}
	carouselChange(carouselIndex){
		this.setState({carouselIndex});
	}
	render() {
		return (
			<div className={"EventCreator"}>
				<Carousel centered infinite slidesPerPage={2} dots
					value={this.state.value}
					slides={this.state.slides}
					onChange={this.carouselChange}
				/>
			</div>
		);
	}
}

export default EventCreator;
