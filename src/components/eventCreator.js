import React, { Component } from "react";
import CarouselMain from "./carousel/carouselMain";

class EventCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carouselIndex: 0,
		}
		this.carouselChange = this.carouselChange.bind(this);
		
	}
	carouselChange(carouselIndex){
		this.setState({carouselIndex});
	}
	render() {
		return (
			<div className={"EventCreator"}>
				<CarouselMain carouselChange={this.carouselChange}/>
			</div>
		);
	}
}

export default EventCreator;
