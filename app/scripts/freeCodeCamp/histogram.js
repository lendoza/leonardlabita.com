var Histogram = (function(){

  d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(jsonData) {

      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      var formatCurrency = d3.format("$,.2f");
    
      var data = jsonData.data;

      d3.select(".notes")
        .append("text")
        .text(jsonData.description);

      var margin = {
          top: 5,
          right: 10,
          bottom: 30,
          left: 75
        },
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var barWidth = Math.ceil(width / data.length);

      var minDate = new Date(data[0][0]);
      var maxDate = new Date(data[274][0]);

      var x = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

      var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) {
          return d[1];
        })]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(d3.time.years, 5);

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "");

      var infobox = d3.select(".infobox");

      var div = d3.select(".card").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      chart.transition()
        .duration(1000)
        .delay(100)

      chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.8em")
        .style("text-anchor", "end")
        .text("Gross Domestic Product, USA");

      chart.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
          return x(new Date(d[0]));
        })
        .attr("y", function(d) {
          return height;
        })
        .attr("width", function(d){
          return barWidth
        })
        .attr("height", 0)

        // Animation
        .transition()
        .delay(200)
        .attr("height", function(d){
          return height - y(d[1]);          
        })
        .attr("y", function(d){
          return y(d[1]);
        })
        .duration(1500);

      chart.selectAll(".bar")
        .on("mouseover", function(d) {
          var rect = d3.select(this);
          rect.attr("class", "mouseover");
          var currentDateTime = new Date(d[0]);
          var year = currentDateTime.getFullYear();
          var month = currentDateTime.getMonth();
          var dollars = d[1];
          div.transition()
            .duration(200)
            .style("opacity", 0.9);
          div.html("<span class='amount'>" + formatCurrency(dollars) + "&nbsp;Billion </span><br><span class='year'>" + year + ' - ' + months[month] + "</span>")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 50) + "px");
        })
        .on("mouseout", function() {
          var rect = d3.select(this);
          rect.attr("class", "mouseoff");
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });

    });

  })();