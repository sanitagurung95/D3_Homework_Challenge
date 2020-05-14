// @TODO: YOUR CODE HERE!
// The code for the chart is wrapped inside a function
// that automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads, remove it
    // and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width
    // and height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 30,
      right: 50,
      bottom: 80,
      left: 100
    };
  
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    console.log(chartHeight);
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    console.log(chartWidth);

    // append svg and group
    var svg = d3.select(".scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    var chartGroup = svg.append("g")
        console.log(chartGroup)

      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    // Read CSV
      d3.csv("data.csv").then(function(data){
          console.log(data);

         // create date parser
    var dateParser = d3.timeParse("%d-%b");

        // parse data
          data.forEach(function(data) {
              data.poverty = dateParser(data.poverty);
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

    chartGroup.selectAll("scatter")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "scatter")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "13")
    .attr("fill", "steelblue")
    .attr("opacity", 0.6);
    // .attr("stroke-width", "1")
    // .attr("stroke", "black");

    // CITED : LINE 1 TO 84 FROM LESSON-PLANS 16-D3, ACTIVITIES 3 SOLVED (7)


      });
    //   Add states label to the points
    circlesGroup.selectAll("texts")
    .data(data)
    .enter()
    .append("text") 
    circleLabels
    .attr("x", function(d) {return d.poverty;})
    .attr("y", function(d) {return d.healthcare;})
    .text(function(d) {
    return (d.abbr);
    })
    .attr("font-size", "8px")
    .attr("fill", "white");

// Create axes labels
chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left+ 20)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)")
    
chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)"); 

    // CITED FROM https://stackoverflow.com/questions/55988709/how-can-i-add-labels-inside-the-points-in-a-scatterplot

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
