import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class EventCreator extends Component {
	constructor() {
		super();
		this.state = {
			mobile: true,
			carouselIndex: 0,
			slides: [
				(<div>1</div>),
				(<div>2</div>),
				(<div>3</div>),
			],
			thumbnails: [
				(<div>1</div>),
				(<div>2</div>),
				(<div>3</div>),
			]

		}
		this.carouselChange = this.carouselChange.bind(this);
		
	}
	carouselChange(carouselIndex){
		this.setState({carouselIndex});
	}
	render() {
		return (
			<div className={"EventCreator"}>
				<Carousel centered infinite slidesPerPage={2}
					value={this.state.value}
					slides={this.state.slides}
					onChange={this.carouselChange}
				/>
				<Dots number={this.state.thumbnails.length} thumbnails={this.state.thumbnails} value={this.state.value} onChange={this.carouselChange} number={this.state.slides.length} />
			</div>
		);
	}
}

export default EventCreator;
