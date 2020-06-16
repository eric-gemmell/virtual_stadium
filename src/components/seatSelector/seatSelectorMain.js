import React, { Component } from "react";
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
				<div id={"svg container"} style={{width:"100%",height:"100%"}} ref={(svgContainer) => this.svgContainer = svgContainer}>
					<svg style={{width:"100%"}} viewBox={"0 0 100 30"} >
						<g id="zoom">
							<rect className="selectable" x="10" y="10" width="10" height="10" style={{fill:"red",strokeWidth:"1",stroke:"black"}} />
							<rect className="decoration" x="30" y="10" width="10" height="10" style={{fill:"blue",strokeWidth:"1",stroke:"black"}} />
						</g>
					</svg>
				</div>	
			</div>
		      );
	}
	componentDidUpdate(){
		if(this.state.d3Loaded && this.state.svgLoaded && !this.state.svgDisplayed){
			console.log(stadiumSvg);
			d3.xml(stadiumSvg).then(xml => {
				console.log("d3 loaded and the image too, this is the data", xml);
				//let importedNode = document.importNode(xml.documentElement, true);
				//d3.select(this.svgContainer).node().appendChild(importedNode);
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
					})
					.on("click", function(){
						d3.select("svg")
							.transition()
							.duration(750)
							.attr("viewBox","0 0 50 15");
					});
				console.log(d3.select(this.svgContainer).select(".selectable").node().getBBox());
				d3.select("svg")
					.call(d3.zoom().on("zoom", function () {
						d3.select("#zoom").attr("transform", d3.event.transform)
					}));
			});
			this.setState({svgDisplayed:true});
		}
	}	
	zoomInOnSection(section){
		
	}
}

export default SeatSelector;
