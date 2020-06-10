import React, { Component } from "react";
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import CarouselElement from "./carouselElement";
import largeStadium from "./madridStadium.png";

class CarouselMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carouselIndex: 0,
			selectedStadium: null,

		}
		this.carouselChange = this.carouselChange.bind(this);
		this.carouselSelected = this.carouselSelected.bind(this);
		
	}
	carouselChange(carouselIndex){
		this.setState({carouselIndex});
	}
	carouselSelected(carouselIndex){
		let modedIndex = ((this.state.carouselIndex%3)+3)%3;
		let newIndex = this.state.carouselIndex;
		if(modedIndex == 0){
			if(carouselIndex == 2){
				newIndex = this.state.carouselIndex - 1;
			}
			else if(carouselIndex == 1){
				newIndex = this.state.carouselIndex + 1;
			}
		}
		else if(modedIndex == 2){
			if(carouselIndex == 0){
				newIndex = this.state.carouselIndex + 1;
			}
			else if(carouselIndex == 1){
				newIndex = this.state.carouselIndex - 1;
			}
		}
		else{
			newIndex = this.state.carouselIndex + carouselIndex - 1;
		}
		this.setState({carouselIndex:newIndex,selectedStadium:carouselIndex});
	}
	render() {
		
		return (
			<div className={"CarouselMain"}>
				<Carousel centered infinite slidesPerPage={(this.props.windowSize>500)?Math.min(this.props.windowSize/250,3):2 } dots
					value={this.state.carouselIndex}
					onChange={this.carouselChange}
				>
					<CarouselElement image={largeStadium} alt={"Stadium capacity 10000"} index={0} 
						carouselIndex={this.state.carouselIndex} selectedStadium={this.state.selectedStadium} clicked={this.carouselSelected}
					/>
					<CarouselElement image={largeStadium} alt={"Stadium capacity 10000"} index={1} 
						carouselIndex={this.state.carouselIndex} selectedStadium={this.state.selectedStadium} clicked={this.carouselSelected}
					/>
					<CarouselElement image={largeStadium} alt={"Stadium capacity 10000"} index={2} 
						carouselIndex={this.state.carouselIndex} selectedStadium={this.state.selectedStadium} clicked={this.carouselSelected}
					/>
				</Carousel>
			</div>
		);
	}
}

export default CarouselMain;
