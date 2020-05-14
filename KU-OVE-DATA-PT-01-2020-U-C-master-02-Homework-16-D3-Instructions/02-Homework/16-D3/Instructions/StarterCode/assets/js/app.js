
// @TODO: YOUR CODE HERE!
  
var svgHeight = 700;
var svgWidth = 1000;
// SVG wrapper dimensions are determined by the current width
// and height of the browser window.

var chartMargin = {
  top: 30,
  right: 50,
  bottom: 30,
  left: 50
};

var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
console.log(chartHeight);
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
console.log(chartWidth);

// append svg and group
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")

  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  console.log(chartGroup)

  
// Read CSV
  d3.csv("assets/data/data.csv").then(function(data){
      // console.log(data);


    // parse data
      data.forEach(function(data) {
          data.poverty = +data.poverty;
          data.healthcare = +data.healthcare;
          
      });
      
     
  // create scales
var xLinearScale = d3.scaleLinear()
.domain(d3.extent(data, d => d.poverty))
.range([0, chartWidth]);
console.log(xLinearScale)

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(data, d => d.healthcare)])
.range([chartHeight, 0]);

// create axes
var bottomAxis = d3.axisBottom(xLinearScale).ticks(8);
console.log(bottomAxis);
var leftAxis = d3.axisLeft(yLinearScale).ticks(12);
console.log(leftAxis);

// append axes
chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

// append circles

chartGroup.selectAll(".scatter")
.data(data)
.enter()
.append("circle")
.attr("class", "scatter")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "13")
.attr("fill", "blue")
.attr("opacity", 0.6);
// .attr("stroke-width", "1")
// .attr("stroke", "black");

// CITED : LINE 1 TO 84 FROM LESSON-PLANS 16-D3, ACTIVITIES 3 SOLVED (7)
  
//   Add states label to the points
chartGroup.selectAll("texts")
.data(data)
.enter()
.append("text") 
.text(function(d) {
  return (d.abbr)
})
// circleLabels
.attr("x",  d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("font-size", "10px")
.attr("fill", "white");

// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - chartMargin.left + 10)
.attr("x", 0 - (chartHeight / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Lacks Healthcare (%)")

chartGroup.append("text")
.attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
.attr("class", "axisText")
.style("text-anchor", "middle")
.text("In Poverty (%)"); 

// CITED FROM https://stackoverflow.com/questions/55988709/how-can-i-add-labels-inside-the-points-in-a-scatterplot


// Initialize tooltip
// Step 1: Append tooltip div
// Step 1: Append tooltip div
var toolTip = d3.select("body")
.append("div")
.classed("tooltip", true);

// Step 2: Create "mouseover" event listener to display tooltip
chartGroup.on("mouseover", function(d) {
toolTip.style("display", "block")
  .html(function(d) {
    return  `${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}<br>`
    .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");

  })
      
  // Step 3: Create "mouseout" event listener to hide tooltip
  .on("mouseout", function() {
    toolTip.style("display", "none");
  }).catch(function(error) {
console.log(error);
});
// CITED TOOLTIP FROM LESSON-PLANS 16-D3, ACTIVITIES 3 SOLVED(7)
});
  })
