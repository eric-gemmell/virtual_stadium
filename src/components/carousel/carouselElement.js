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
				<img src={this.props.image} alt={this.props.alt} style ={(this.props.selectedStadium == this.props.index) ? {padding:"1px", border:"5px solid steelblue"} : {}}/>
			</div>
		);
	}
}

export default CarouselElement;
