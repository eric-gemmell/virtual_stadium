import React, { Component } from "react";

class CarouselElement extends Component {
	constructor(props) {
		super(props);
		this.selected = this.selected.bind(this);
	}
	selected(){
		this.props.clicked(this.props.index);
	}
	render() {
		return (
			<div className={"carouselElement"} onClick={this.selected}>
				<img src={this.props.image} alt={this.props.alt} style ={(this.props.selectedStadium == this.props.index) ? {width: "100%",borderBottom: "5px solid steelblue"} : {width:"100%"}}/>
			</div>
		);
	}
}

export default CarouselElement;
