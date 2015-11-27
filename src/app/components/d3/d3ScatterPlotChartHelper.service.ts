module tmnProject {
  'use strict';

  export class d3ScatterPlotChartHelperService{
    
    /** @ngInject */
    constructor(private d3HelperService: any) { }

    public createScatterPlot(d3, width, height, margin, data, ele, cssClass, parseDate, title) {
      var x = d3.time.scale().range([0, width]);

      var y = d3.scale.linear()
        .range([height, 0]);

      var color = d3.scale.category10();

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      data.forEach(function(d) {
        d.date = parseDate(d.date);
      });

      x.domain(d3.extent(data, function(d) { return d.date; })).nice();
      y.domain(d3.extent(data, function(d) { return d.ba; })).nice();

      var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Date");

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Batting Average")

      svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.ba); })
        .style("fill", "green")
        .on("mouseover", function(d) {
          d3.select(this).style("fill", "orange");
          tooltip.transition()
            .duration(100)
            .style("opacity", .9);
              tooltip.html(d.date + "<br/>" + (d.ba))
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this).style("fill", "green");
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        })

      var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    }

    
  }
}
