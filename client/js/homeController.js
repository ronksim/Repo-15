saburiKonnect.controller('homeController', function($scope, $location, NewOrganisationFactory){

	$scope.thirteen = function() {
		data = [{label: "age 5-7", value: 1000}, {label: "age 8-10", value: 2500}, {label: "age 11-12", value: 2750}, {label: "age 13-14", value: 2750}, {label: "age 15-17", value: 2750}, {label: "age 18-20", value: 2750}]
		change(data)
		// alert("hello")
	}
	$scope.fourteen = function() {
		data = [{label: "age 5-7", value: 1302}, {label: "age 8-10", value: 2300}, {label: "age 11-12", value: 1403}, {label: "age 13-14", value: 2042}, {label: "age 15-17", value: 2750}, {label: "age 18-20", value: 3203}]
		change(data)
	}
	$scope.fifteen = function() {
		data = [{label: "age 5-7", value: 3921}, {label: "age 8-10", value: 1392}, {label: "age 11-12", value: 2392}, {label: "age 13-14", value: 2042}, {label: "age 15-17", value: 2942}, {label: "age 18-20", value: 1943}]
		change(data)
		// alert("hello")
	}

	var svg = d3.select("#chart")
	.append("svg")
	.append("g")

	svg.append("g")
		.attr("class", "slices");
	svg.append("g")
		.attr("class", "labels");
	svg.append("g")
		.attr("class", "lines");

	var width = 960,
	    height = 450,
		radius = Math.min(width, height) / 2;

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {
			return d.value;
		});

	var arc = d3.svg.arc()
		.outerRadius(radius * 0.8)
		.innerRadius(radius * 0.4);

	var outerArc = d3.svg.arc()
		.innerRadius(radius * 0.9)
		.outerRadius(radius * 0.9);

	svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var key = function(d){ return d.data.label; };

	var color = d3.scale.ordinal()
		.domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	function randomData (){
		var labels = color.domain();
		return labels.map(function(label){
			return { label: label, value: Math.random() }
		});
	}

	// change(randomData());
	var data = [{label: "age 5-7", value: 0}, {label: "age 8-10", value: 1}, {label: "age 11-12", value: 0}, {label: "age 13-14", value: 0}, {label: "age 15-17", value: 0}, {label: "age 18-20", value: 0}]
	change(data)

	setTimeout(function(){
		data = [{label: "age 5-7", value: 3921}, {label: "age 8-10", value: 1392}, {label: "age 11-12", value: 2392}, {label: "age 13-14", value: 2042}, {label: "age 15-17", value: 2942}, {label: "age 18-20", value: 1943}]
		change(data)
	},500);

	d3.select(".randomize")
		.on("click", function(){
			// change(randomData());
		});


	function change(data) {
		console.log(data)
		/* ------- PIE SLICES -------*/
		var slice = svg.select(".slices").selectAll("path.slice")
			.data(pie(data), key);

		slice.enter()
			.insert("path")
			.style("fill", function(d) { return color(d.data.label); })
			.attr("class", "slice");

		slice
			.transition().duration(1000)
			.attrTween("d", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					return arc(interpolate(t));
				};
			})

		slice.exit()
			.remove();

		/* ------- TEXT LABELS -------*/

		var text = svg.select(".labels").selectAll("text")
			.data(pie(data), key);

		text.enter()
			.append("text")
			.attr("dy", ".35em")
			.text(function(d) {
				return d.data.label;
			});

		function midAngle(d){
			return d.startAngle + (d.endAngle - d.startAngle)/2;
		}

		text.transition().duration(1000)
			.attrTween("transform", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
					return "translate("+ pos +")";
				};
			})
			.styleTween("text-anchor", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					return midAngle(d2) < Math.PI ? "start":"end";
				};
			});

		text.exit()
			.remove();

		/* ------- SLICE TO TEXT POLYLINES -------*/

		var polyline = svg.select(".lines").selectAll("polyline")
			.data(pie(data), key);

		polyline.enter()
			.append("polyline");

		polyline.transition().duration(1000)
			.attrTween("points", function(d){
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
					var d2 = interpolate(t);
					var pos = outerArc.centroid(d2);
					pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
					return [arc.centroid(d2), outerArc.centroid(d2), pos];
				};
			});

		polyline.exit()
			.remove();
	};

	var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	var parse = d3.time.format("%b %Y").parse;

	// Scales and axes. Note the inverted domain for the y-scale: bigger is up!
	var x = d3.time.scale().range([0, width]),
	    y = d3.scale.linear().range([height, 0]),
	    xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true),
	    yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

	// An area generator, for the light fill.
	var area = d3.svg.area()
	    .interpolate("monotone")
	    .x(function(d) { return x(d.date); })
	    .y0(height)
	    .y1(function(d) { return y(d.price); });

	// A line generator, for the dark stroke.
	var line = d3.svg.line()
	    .interpolate("monotone")
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.price); });

	d3.csv("readme.csv", type, function(error, data) {

	  // Filter to one symbol; the S&P 500.
	  var values = data.filter(function(d) {
	    return d.symbol == "AMZN";;
	  });

	  var msft = data.filter(function(d) {
	    return d.symbol == "MSFT";
	  });

	  var ibm = data.filter(function(d) {
	    return d.symbol == 'IBM';
	  });

	  // Compute the minimum and maximum date, and the maximum price.
	  x.domain([values[0].date, values[values.length - 1].date]);
	  y.domain([0, d3.max(values, function(d) { return d.price; })]).nice();

	  // Add an SVG element with the desired dimensions and margin.
	  var svg = d3.select("#lineChart")
	      .attr("width", width + margin.left + margin.right)
	      .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	  // Add the clip path.
	  svg.append("clipPath")
	      .attr("id", "clip")
	    .append("rect")
	      .attr("width", width)
	      .attr("height", height);

	  // Add the x-axis.
	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  // Add the y-axis.
	  svg.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(" + width + ",0)")
	      .call(yAxis);


	  var colors = d3.scale.category10();
	  svg.selectAll('.line')
	    .data([values, msft, ibm])
	    .enter()
	      .append('path')
	        .attr('class', 'line')
	        .style('stroke', function(d) {
	          return colors(Math.random() * 50);
	        })
	        .attr('clip-path', 'url(#clip)')
	        .attr('d', function(d) {
	          return line(d);
	        })

	  /* Add 'curtain' rectangle to hide entire graph */
	  var curtain = svg.append('rect')
	    .attr('x', -1 * width)
	    .attr('y', -1 * height)
	    .attr('height', height)
	    .attr('width', width)
	    .attr('class', 'curtain')
	    .attr('transform', 'rotate(180)')
	    .style('fill', '#ffffff')

	  /* Optionally add a guideline */
	  var guideline = svg.append('line')
	    .attr('stroke', '#333')
	    .attr('stroke-width', 0)
	    .attr('class', 'guide')
	    .attr('x1', 1)
	    .attr('y1', 1)
	    .attr('x2', 1)
	    .attr('y2', height)

	  /* Create a shared transition for anything we're animating */
	  var t = svg.transition()
	    .delay(750)
	    .duration(6000)
	    .ease('linear')
	    .each('end', function() {
	      d3.select('line.guide')
	        .transition()
	        .style('opacity', 0)
	        .remove()
	    });

	  t.select('rect.curtain')
	    .attr('width', 0);
	  t.select('line.guide')
	    .attr('transform', 'translate(' + width + ', 0)')

	  d3.select("#show_guideline").on("change", function(e) {
	    guideline.attr('stroke-width', this.checked ? 1 : 0);
	    curtain.attr("opacity", this.checked ? 0.75 : 1);
	  })

	});

	// Parse dates and numbers. We assume values are sorted by date.
	function type(d) {
	  d.date = parse(d.date);
	  d.price = +d.price;
	  return d;
	}


	$('#loginModalSponsor').on('shown.bs.modal', function () {
	  $('#myInput').focus()
	})

	$('#registerModalSponsor').on('shown.bs.modal', function () {
	  $('#myInput').focus()
	})

    $scope.login = function()
    {
    	NewOrganisationFactory.login($scope.orgLogin);
	};

	$scope.register = function()
    {
    	NewOrganisationFactory.addOrganisation($scope.organisation);
    };

})

   saburiKonnect.factory('NewOrganisationFactory',function($http){
    	var factory = {};
        factory.login = function(info,callback){
            $http.post('/login', info).success(function(output){
            	console.log(output);
                // callback(output);
            });
        };
    	factory.add_Organisation = function(info,callback){
        	$http.post('/add_organisation', info).success(function(output){
            	callback(output);
        	});
        };
    	return factory;
    });
