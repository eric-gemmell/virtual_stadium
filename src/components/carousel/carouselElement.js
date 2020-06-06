import React, { Component } from "react";

class CarouselElement extends Component {
	constructor(props) {
		super(props);
		this.selected = this.selected.bind(this);
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);
		this.state = {
			hovered: false
		}
	}
	selected(){
		this.props.clicked(this.props.index);
	}
	mouseEnter() {
		this.setState({hovered: true});
	}

	mouseLeave() {
		this.setState({hovered: false});
	}
	render() {
		let selected = this.props.selectedStadium == this.props.index;
		return (
			<div className={"carouselElement"} onClick={this.selected}>
				<img src={this.props.image} alt={this.props.alt} onMouseOver={this.mouseEnter} onMouseOut={this.mouseLeave} style ={selected ? selectedStyle : (this.state.hovered ? hoveredStyle : standardStyle)}/>
			</div>
		);
	}
}

export default CarouselElement;
let selectedStyle = {
	width: "100%",
	borderBottom: "5px solid steelblue"
};
let hoveredStyle = {
	width: "100%",
	borderBottom: "5px solid #6d6d6d"
};
let standardStyle = {
	width: "100%",
	borderBottom: "5px solid rgba(0,0,0,0)"
};
