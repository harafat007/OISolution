
angular.module("app")
.controller('chartController', ['$scope', '$log', '$interval', function ($scope, $log, $interval) {
    $scope.stockdata = [
        { hour: 1, price: 54 },
        { hour: 2, price: 66 },
        { hour: 3, price: 77 },
        { hour: 4, price: 70 },
        { hour: 5, price: 60 },
        { hour: 6, price: 63 },
        { hour: 7, price: 55 },
        { hour: 8, price: 47 },
        { hour: 9, price: 55 },
        { hour: 10, price: 30 }
    ];

    //setChartParameters();

    $interval(function () {
        var hour = $scope.stockdata.length + 1;
        var price = Math.round(Math.random() * 100);
        $scope.stockdata.push({ hour: hour, price: price });
    }, 1000, 100); //push 100 random values of price into the price array with a delay of 1000 mili second:
}])

.directive('linearChart', function($parse, $window){
    return{
        restrict:'EA',
        template: "<svg width='850' height='200'></svg>",
        scope:
            {
                stockdata: "="
            },
        link: function(scope, elem, attrs){
            
            var stockDataToPlot = scope.stockdata;

            var padding = 20;
            var pathClass="path";
            var xScale, yScale, xAxisGen, yAxisGen, lineFun;

            var d3 = $window.d3; //To make the directive testable, using the object through $window
            var rawSvg=elem.find('svg');
            var svg = d3.select(rawSvg[0]);

            var exp = $parse(attrs.stockdata);
            //using a collection watcher to watch the changes on the model. The watcher is invoked when any change is made to the collection.
            scope.$watchCollection(exp, function (newVal, oldVal) {
                stockDataToPlot=newVal;
                redrawLineChart();
            });

            //Invoke the chart draw method
            drawLineChart();

            //Chart Function Declaration - Begin
            function setChartParameters() {

                xScale = d3.scale.linear()
                    .domain([stockDataToPlot[0].hour, stockDataToPlot[stockDataToPlot.length - 1].hour])
                    .range([padding + 5, rawSvg.attr("width") - padding]);

                yScale = d3.scale.linear()
                    .domain([0, d3.max(stockDataToPlot, function (d) {
                        return d.price;
                    })])
                    .range([rawSvg.attr("height") - padding, 0]);

                xAxisGen = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(stockDataToPlot.length - 1);

                yAxisGen = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5);

                //draw the line
                lineFun = d3.svg.line()
                    .x(function (d) {
                        return xScale(d.hour);
                    })
                    .y(function (d) {
                        return yScale(d.price);
                    })
                    .interpolate("basis");
            }

            //draw chart for first time
            function drawLineChart() {

                setChartParameters();
                //apply the styles and transformations to the chart & append everything to the svg element in the directive template
                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0,180)")
                    .call(xAxisGen);

                svg.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(20,0)")
                    .call(yAxisGen);

                svg.append("svg:path")
                    .attr({
                        d: lineFun(stockDataToPlot),
                        "stroke": "blue",
                        "stroke-width": 2,
                        "fill": "none",
                        "class": pathClass
                    });
            }

            function redrawLineChart() {

                setChartParameters();

                svg.selectAll("g.y.axis").call(yAxisGen);

                svg.selectAll("g.x.axis").call(xAxisGen);

                svg.selectAll("." + pathClass)
                    .attr({
                        d: lineFun(stockDataToPlot)
                    });
            }
            //Chart Function Declaration - End
        }
    };
});