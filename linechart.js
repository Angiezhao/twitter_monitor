function drawLine(targetID, data){
  var margin = {top: 20, right: 20, bottom: 30, left: 30},
      width = 380 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom;

  data.forEach(function(d) {
      d.key = d.key;
      d.doc_count = +d.doc_count;
  });

  var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.key; }))
      .range([0, width]);
      //x.tickFormat("%I:%M");
  var y = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.doc_count; }))
      .range([height, 0]);

  var parseTime = d3.timeParse("%c");

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y);
  yAxis.ticks(1);

  var lineData = d3.line()
      .x(function(d) { return x(d.key); })
      .y(function(d) { return y(d.doc_count); });

  d3.select(targetID).selectAll("svg").remove();
  var svg = d3.select(targetID).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // svg.append("g")
  //       .attr("class", "x axis")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(xAxis);

    // svg.append("g")
    //     //.attr("transform", "rotate(90)")
    //     .attr("class", "y axis")
    //     .call(yAxis)
    //   .append("text")        
    //     .attr("y", 6)
    //     .attr("dy", ".71em")
    //     .style("text-anchor", "end")
    //     .text("Tweets Num");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", lineData);
};

