import React, { Component } from "react";
import logo from "../images/logo.png";
let d3 = null;
let stadiumSvg = null;
class SeatSelector extends Component {
	constructor(props){
		super(props);	
		import("d3").then(library => {
			d3 = library;
  			this.setState({d3Loaded:true});
		});
		import("./stadiumSVG/custom.svg").then(svg => {
			stadiumSvg = svg.default;
			this.setState({svgLoaded:true});
		});
		this.state = {
		};
	}
	render(){
		return(
			<div>
				{/*<div style={headerStyles(this.props.mobile)}>
					<img src={logo} style={logoStyles(this.props.mobile)}/>
					<div style={headerTextStyles(this.props.mobile)}>Seat Selector</div>
				</div>*/}
				<div id={"svg container"} style={{width:"100%",height:"100%"}} ref={(svgContainer) => this.svgContainer = svgContainer}>
					
				</div>	
			</div>
		      );
	}
	componentDidUpdate(){
		if(this.state.d3Loaded && this.state.svgLoaded && !this.state.svgDisplayed){
			console.log(stadiumSvg);
			d3.xml(stadiumSvg).then(xml => {
				console.log("d3 loaded and the image too, this is the data", xml);
				let importedNode = document.importNode(xml.documentElement, true);
				d3.select(this.svgContainer).node().appendChild(importedNode);
				d3.select(this.svgContainer)
					.selectAll(".selectable")
					.on("mouseover",function() {
						d3.select(this)
							.attr("oldStyle",d3.select(this).style("stroke"))
							.style("stroke","yellow");
					})
					.on("mouseout",function(){
						d3.select(this)
							.style("stroke",d3.select(this).attr("oldStyle"));
					});
			});
			this.setState({svgDisplayed:true});
		}
	}	
}

export default SeatSelector;
let headerStyles = (mobile) => {
	return {
		backgroundColor:"#333",
		paddingBottom: (mobile ? "2%": "0.5%"),
		paddingTop: (mobile ?"2.5%":"1%"),
		overflow:"hidden",
		display: "flex",
		alignItems: "center",
	};
};
let logoStyles = (mobile) => {
	return {
		maxWidth:"20%",
		maxHeight:(mobile)?"50px":"70px",
		paddingLeft:"5%",
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
		width:"80%",
	};
};

