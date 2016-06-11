// Data exported from apple health and basis apps into CSV format through QS Access App
// CSV data converted to json through http://www.csvjson.com/csv2json
 
/* tt
 
API returns entire iris dataset
http://tranquil-peak-82564.herokuapp.com/api/v1.0/data/iris/
 
API returns n=10 entries from dataset, useful for debugging
http://tranquil-peak-82564.herokuapp.com/api/v1.0/data/iris/limit/10/
 
data is in this format
{"sepal_length":5.1,"sepal_width":3.5,"petal_length":1.4,"petal_width":0.2,"species":"setosa"}
 
*/
 
// on load data {
 
  // crossfilter
 
  // dimensions for sepal_length, sepal_width, petal_length, petal_width, species
 
  // unique values for species (hint: underscore.js)
 
  // bar charts for sepal_length, sepal_width, petal_length, petal_width, species
 
  // render
 
// } end load data
 
//using https://dc-js.github.io/dc.js/docs/stock.html for guidance
 
 
//json = JSON.parse( "app/assets/data/trellis.json" );
 
d3.json("http://warm-cliffs-73390.herokuapp.com/health", function(remote_json){
window.remote_json = remote_json;
 };
  // crossfilter
  var cf  = crossfilter(remote_json);
  var all = cf.groupAll();
 
 
  /* implement unique species name extraction */
  window.species_names = _.chain(remote_json).pluck("name").uniq().value();
 
  // dimension;
  var dim_date              = cf.dimension(function(d){return d.Date; });
  var dim_hour              = cf.dimension(function(d){return d.Time; });
  var dim_flights_climbed   = cf.dimension(function(d){return Math.round(d.flights_climbed); });
  var dim_distance_mi       = cf.dimension(function(d){return d.distance_mi.toFixed(2); });
  var dim_distance_km       = cf.dimension(function(d){return d.distance_km.toFixed(2);});
  var dim_active_cal        = cf.dimension(function(d){return d.active_cal;});
  var dim_heart_rate        = cf.dimension(function(d){return d.heart_rate;});
  var dim_resting_hr        = cf.dimension(function(d){return d.resting_hr;});
  var dim_name              = cf.dimension(function(d){return d.Name;});
  var dim_steps             = cf.dimension(function(d){return d.steps;});
  var dim_weekday           = cf.dimension(function(d){return d.Weekday;});
 
  // groups
  var flights_climbed_sume = dim_flights_climbed.group().reduceSum(function(d) { return d.flights_climbed });
  var distance_km_sum = dim_distance_km.group().reduceSum(function(d) { return d.distance_km });
  var distance_mi_sum = dim_distance_mi.group().reduceSum(function(d) { return d.distance_mi });
  var active_cal_sum = dim_active_cal.group().reduceSum(function(d) { return d.active_cal });
  var heart_rate_sum = dim_heart_rate.group().reduceSum(function(d) { return d.heart_rate });
  var resting_hr_sum = dim_resting_hr.group().reduceSum(function(d) { return d.resting_hr });
  var steps_sum = dim_steps.group().reduceSum(function(d) { return d.steps });
 
  var date_count = dim_date.group().reduceCount();
  var hour_count = dim_hour.group().reduceCount();
  var name_count = dim_name.group().reduceCount();
  var weekday_count = dim_weekday.group().reduceCount();
 
  var daily_steps = dim_date.group().reduceSum(function(d) { return d.steps });
  var daily_flights = dim_date.group().reduceSum(function(d) { return d.flights_climbed });
  var daily_activecal = dim.date.group().reduceSum(function(d) {return d.active_cal });
  var hourly_steps = dim_hour.group().reduceSum(function(d) { return d.steps });
  var hourly_flights = dim_hour.group().reduceSum(function(d) { return d.flights_climbed });
  var weekly_steps = dim_weekday.group().reduceSum(function(d) { return d.steps });
  var weekly_flights = dim_weekday.group().reduceSum(function(d) { return d.flights_climbed });

 
  var reduce_init = function() { return {
    count: 0,
 
    flights_climbed_sum :0,
    distance_km_sum :0,
    distance_mi_sum :0,
    active_cal_sum :0,
    heart_rate_sum :0,
    resting_hr_sum :0,
    steps_sum :0,
 
    flights_climbed_avg :0,
    distance_km_avg :0,
    distance_mi_avg :0,
    active_cal_avg :0,
    heart_rate_avg :0,
    resting_hr_avg :0,
    steps_avg :0,
 
    flights_climbed_diff :0,
    distance_km_diff :0,
    distance_mi_diff :0,
    active_cal_diff :0,
    heart_rate_diff :0,
    resting_hr_diff :0,
    steps_diff :0
    };
  };
 
  var reduce_add = function(p, v, nf) {
    ++p.count;
    p.flights_climbed_sum += p.flights_climbed;
    p.distance_km_sum += p.distance_km;
    p.distance_mi_sum += p.distance_mi;
    p.active_cal_sum += p.active_cal;
    p.heart_rate_sum += p.heart_rate;
    p.resting_hr_sum += p.resting_hr;
    p.steps_sum += p.steps;
 
    p.flights_climbed_avg = p.flights_climbed_sum/p.count;
    p.distance_km_avg = p.distance_km_sum/p.count;
    p.distance_mi_avg = p.distance_mi_sum/p.count;
    p.active_cal_avg = p.active_cal_sum/p.count;
    p.heart_rate_avg = p.heart_rate_sum/p.count;
    p.resting_hr_avg = p.resting_hr_sum/p.count;
    p.steps_avg += p.steps_sum/p.count;
 
    p.flights_climbed_diff = p.flights_climbed - p.flights_climbed_avg;
    p.distance_km_diff = p.distance_km - p.distance_km_avg;
    p.distance_mi_diff = p.distance_mi - p.distance_mi_avg;
    p.active_cal_diff = p.active_cal - p.active_cal_avg;
    p.heart_rate_diff = p.heart_rate - p.heart_rate_avg;
    p.resting_hr_diff = p.resting_hr - p.resting_hr_avg;
    p.steps_diff = p.steps - p.steps_avg;
    return p;
  };
 
  var reduce_remove = function(p, v, nf) {
    --p.count;
    p.flights_climbed_sum -= p.flights_climbed;
    p.distance_km_sum -= p.distance_km;
    p.distance_mi_sum -= p.distance_mi;
    p.active_cal_sum -= p.active_cal;
    p.heart_rate_sum -= p.heart_rate;
    p.resting_hr_sum -= p.resting_hr;
    p.steps_sum -= p.steps;
 
    p.flights_climbed_avg = p.flights_climbed_sum/p.count;
    p.distance_km_avg = p.distance_km_sum/p.count;
    p.distance_mi_avg = p.distance_mi_sum/p.count;
    p.active_cal_avg = p.active_cal_sum/p.count;
    p.heart_rate_avg = p.heart_rate_sum/p.count;
    p.resting_hr_avg = p.resting_hr_sum/p.count;
    p.steps_avg += p.steps_sum/p.count;
 
    p.flights_climbed_diff = p.flights_climbed - p.flights_climbed_avg;
    p.distance_km_diff = p.distance_km - p.distance_km_avg;
    p.distance_mi_diff = p.fdistance_mi - p.distance_mi_avg;
    p.active_cal_diff = p.active_cal - p.active_cal_avg;
    p.heart_rate_diff = p.heart_rate - p.heart_rate_avg;
    p.resting_hr_diff = p.resting_hr - p.resting_hr_avg;
    p.steps_diff = p.steps - p.steps_avg;
    return p;
  };
 
date_count.reduce(reduce_add, reduce_remove, reduce_init);
 
 
  var health_bubble = dc
    .bubbleChart("#health_bubble","bar")
    .width(600)
    .height(400)
    .transitionDuration(1000)
    .dimension( m)
    .group(group_sw)
    .keyAccessor(function (p) {return p.value.petal_length_avg;})
    .valueAccessor(function (p) {return p.value.petal_width_avg;})
    .radiusValueAccessor(function (p) {return p.value.count;})
    .maxBubbleRelativeSize(0.03)
    .x(d3.scale.linear().domain([0, 8]))
    .y(d3.scale.linear().domain([0, 3]))
    .r(d3.scale.linear().domain([0, 5]))
    .elasticY(true)
    .elasticX(true)
    .yAxisPadding(0.5)
    .xAxisPadding(1)
     .renderHorizontalGridLines(true)
     .renderVerticalGridLines(true)
     .xAxisLabel('Petal Length')
     .yAxisLabel('Petal Width')
     .renderLabel(false)
     .renderTitle(false);
 
  var steps_week_chart = dc
    .barChart("#project_steps_week", "bar")
    .width(500)
    .height(500)
    .dimension(dim_steps)
    .group(weekly_steps)
    .centerBar(true)
    .elasticY(true)
    .x(d3.scale.ordinal().domain(weekday_count))
    .xUnits(dc.units.ordinal);
 
 
  var steps_day_chart = dc
    .barChart("#project_steps_day", "bar")
    .width(500)
    .height(500)
    .dimension(dim_steps)
    .group(daily_steps)
    .centerBar(true)
    .elasticY(true)
    .x(d3.scale.ordinal().domain(date_count))
    .xUnits(dc.units.ordinal);
 
  var steps_hour_chart = dc
    .barChart("#project_steps_hour", "bar")
    .width(500)
    .height(500)
    .dimension(dim_steps)
    .group(hourly_steps)
    .centerBar(true)
    .elasticY(true)
    .x(d3.scale.ordinal().domain(hour_count))
    .xUnits(dc.units.ordinal);
 
 
 
//
//   var sepal_length_chart = dc
//     .barChart("#dcjs_flower_sepal_length_chart", "bar")
//     .width(250)
//     .height(200)
//     .dimension(steps)
//     .group(daily_steps)
//     .centerBar(true)
//     .elasticY(true)
//     .x( d3.scale.linear().domain([3,10]) )
//     .xUnits(dc.units.fp.precision(.5));
//
//   var species_pie = dc
//     .pieChart("#dcjs_flower_species_chart", "pie")
//     .radius(100)
//     .width(250)
//     .height(200)
//     .dimension(species)
//     .group(species_sum)
//     .renderLabel(true)
//     .label(function (d) { return (d.data.key + " (n=" + d.value + ")"); });
//
//   //add reRender and filter functions for triggered actions
//   var reRender = function(e){
//     species_pie.render()
//   }
//
//   var reRenderNull = function(){
//     petal_length_bubble.filter(null);
//     species_chart.filter(null);
//     sepal_length_chart.filter(null);
//     sepal_width_chart.filter(null);
//     petal_length_chart.filter(null);
//     petal_width_chart.filter(null);
//     species_pie.filter(null);
//     sepal_length_pie.filter(null);
//     sepal_width_pie.filter(null);
//     petal_length_pie.filter(null);
//     petal_width_pie.filter(null);
//     petal_length_bubble.render();
//     dc.renderAll();
//   }
//
//
//   /*
//   Button fun: reset, toggle and pie/chart switches
//   */
//
//   //add a reset button as shown in the tutorial
//   var showButton = function() {
//     if(petal_length_bubble.filters().length > 0 ||
// species_chart.filters().length > 0 || sepal_length_chart.filters().length > 0 || sepal_width_chart.filters().length > 0 || petal_length_chart.filters().length > 0 || petal_width_chart.filters().length > 0 || species_pie.filters().length > 0 || sepal_length_pie.filters().length > 0 || sepal_width_pie.filters().length > 0 || petal_length_pie.filters().length > 0 || petal_width_pie.filters().length > 0 ){
//         d3.select(".dcjs_flower_btn-btn")
//           .remove();
//         d3.select("#dcjs_flower_resetButton")
//           .append("button")
//           .attr("type","button")
//           .attr("class","dcjs_flower_btn-btn")
//           .append("div")
//           .attr("class","label")
//           .text(function(d) { return "Reset"; })
//           .on("click", function(){
//               reRenderNull();
//           });
//     } else {
//         d3.select(".dcjs_flower_btn-btn")
//           .remove();
//     };
// };
//
//   //add various switches to be shown at start
//   var switches = function(){
//     switchBubble();
//     switchPie();
//     switchSpecies();
//     switchSepalLength();
//     switchSepalWidth();
//     switchPetalLength();
//     switchPetalWidth();
//   }
//
//   //switch between sepal/petal
//   var isSepal = 0;
//   var switchBubble = function(){
//     if(isSepal == 0){
//         d3.select(".dcjs_flower_btn-sepal")
//           .remove();
//         d3.select("#dcjs_flower_switchBubble")
//           .append("button")
//           .attr("type","button")
//           .attr("class","dcjs_flower_btn-sepal")
//           .append("div")
//           .attr("class","label")
//           .text(function(d) { return "Change distribution to sepal length and width"; })
//           .on("click", function(){
//             petal_length_bubble
//               .keyAccessor(function (p) {return p.value.sepal_length_avg;})
//               .valueAccessor(function (p) {return p.value.sepal_width_avg;})
//               .xAxisLabel('Sepal Length')
//               .yAxisLabel('Sepal Width')
//               .render();
//             isSepal = 1;
//             d3.select(".dcjs_flower_btn-sepal")
//               .remove();
//             switchBubble();
//           });
//     } else {
//         d3.select(".dcjs_flower_btn-sepal")
//           .remove();
//         d3.select("#dcjs_flower_switchBubble")
//           .append("button")
//           .attr("type","button")
//           .attr("class","dcjs_flower_btn-sepal")
//           .append("div")
//           .attr("class","label")
//           .text(function(d) { return "Change distribution to petal length and width"; })
//           .on("click", function(){
//             petal_length_bubble
//               .keyAccessor(function (p) {return p.value.petal_length_avg;})
//               .valueAccessor(function (p) {return p.value.petal_width_avg;})
//               .xAxisLabel('Petal Length')
//               .yAxisLabel('Petal Width')
//               .render();
//             isSepal = 0;
//             d3.select(".dcjs_flower_btn-sepal")
//               .remove();
//             switchBubble();
//           });
//       };
//   };
//
//   //switch all figures from bar to chart
//   var isPie = 0;
//   var switchPie = function(){
//     if(isPie == 0){
//         d3.select("#dcjs_flower_switchChart")
//           .append("button")
//           .attr("type","button")
//           .attr("class","dcjs_flower_btn")
//           .append("div")
//           .attr("class","label")
//           .text(function(d) { return "Switch ALL to Pie"; })
//           .on("click", function(){
//               isPie = 1;
//               isPie_s = 1;
//               isPie_sl = 1;
//               isPie_sw = 1;
//               isPie_pl = 1;
//               isPie_pw = 1;
//             //  dc.redrawAll();
//               switches();
//               dc.renderAll("pie");
//               d3.select(".dcjs_flower_btn")
//                 .remove();
//           });
//     } else {
//         d3.select("#dcjs_flower_switchChart")
//           .append("button")
//           .attr("type","button")
//           .attr("class","dcjs_flower_btn")
//           .append("div")
//           .attr("class","label")
//           .text(function(d) { return "Switch ALL to Bar"; })
//           .on("click", function(){
//               isPie = 0;
//               isPie_s = 0;
//               isPie_sl = 0;
//               isPie_sw = 0;
//               isPie_pl = 0;
//               isPie_pw = 0;
//         //      dc.redrawAll();
//               switches();
//               dc.renderAll("bar");
//               d3.select(".dcjs_flower_btn")
//                 .remove();
//           });
//       };
//   };
//
//
//
//   //set actions on filter
//   petal_length_bubble.on('filtered', function(){ showButton(); });
//
//   //run it all
//   switches();
 
 
  dc.renderAll();
  console.log("here")
});