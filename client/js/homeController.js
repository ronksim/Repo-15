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
