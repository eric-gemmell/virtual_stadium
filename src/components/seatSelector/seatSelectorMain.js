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
				</div>	
			</div>
		      );
	}
	componentDidUpdate(){
		if(this.state.d3Loaded && this.state.svgLoaded && !this.state.svgDisplayed){
			let zoom = d3.zoom()
				.on("zoom", zoomed);
			function zoomed() {
				const {transform} = d3.event;
				d3.select("#zoom")
					.attr("transform", transform);
			}
			d3.xml(stadiumSvg).then(xml => {
				let importedNode = document.importNode(xml.documentElement, true);
				d3.select(this.svgContainer).node().appendChild(importedNode);
				d3.select("svg")
					.attr("width","100%")
					.attr("height",null)
					.call(zoom);
				d3.select(this.svgContainer)
					.selectAll(".selectable")
					.on("mouseover",function() {
						d3.select(this)
							.attr("oldStyle",d3.select(this).style("fill"))
							.style("fill","yellow");
					})
					.on("mouseout",function(){
						d3.select(this)
							.style("fill",d3.select(this).attr("oldStyle"));
					})
					.on("click",function(){
						let {x0,x1,y0,y1} = getBoundingBox(d3.select(this));
						d3.event.stopPropagation();
						zoom.transform(d3.select("svg").transition().duration(500),d3.zoomIdentity.scale(Math.min(100/(x1-x0+10),30/(y1-y0+10))).translate(-x0+5,-y0+5));
						
					});
			});
			this.setState({svgDisplayed:true});
		}
	}	
}

export default SeatSelector;

function getBoundingBox(selection){
	let BBox = selection.node().getBBox()
	let x0 = BBox.x;
	let y0 = BBox.y;
	let x1 = x0 + BBox.width;
	let y1 = y0 + BBox.height;
	console.log("x0",x0,"y0",y0);
	console.log(d3.geoPath().bounds(selection));
	return {x0,x1,y0,y1};
}
