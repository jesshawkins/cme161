
d3.json("https://warm-cliffs-73390.herokuapp.com/health", function(error, remote_json){
  if (error) throw error;
  window.remote_json = remote_json;
 
  //SETUP
  var cf  = crossfilter(remote_json);
  var all = cf.groupAll();
 
 
  //DIMENSIONS;
  var hour              = cf.dimension(function(d){return d.Time; });
  var date              = cf.dimension(function(d){return d.Date; });
  var weekday           = cf.dimension(function(d){return d.Weekday;});
  var name              = cf.dimension(function(d){return d.Name;});
 
  var distance_km       = cf.dimension(function(d){return d.distance_km.toFixed(2);});
  var active_cal        = cf.dimension(function(d){return d.active_cal;});
  var heart_rate        = cf.dimension(function(d){return d.heart_rate;});
  var resting_hr        = cf.dimension(function(d){return d.resting_hr;});
  var steps             = cf.dimension(function(d){return d.steps;});
 
  var dates = _.chain(remote_json).pluck("Date").uniq().value();
  var hours = _.chain(remote_json).pluck("Time").uniq().value();
 
 
  //REDUCE FUNCTINONS
  var reduce_init = function() { return {
    count: 0,
    dates: [],
    unique_dates: 0,
    hr_count: 0,
    rhr_count: 0,
 
    distance_km_sum :0,
    active_cal_sum :0,
    heart_rate_sum :0,
    resting_hr_sum :0,
    steps_sum :0,
 
    distance_km_avg :0,
    active_cal_avg :0,
    heart_rate_avg :0,
    resting_hr_avg :0,
    steps_avg :0
    };
  };
 
  var reduce_add = function(p, v, nf) {
    ++p.count;
    if(p.dates.indexOf(v.Date) == -1) {
      ++p.unique_dates;
      p.dates.push(v.Date);
    }
    if(v.heart_rate > 0) {
      ++p.hr_count;
      p.heart_rate_sum += v.heart_rate;
    }
    if(v.resting_hr > 0) {
      ++p.rhr_count;
      p.resting_hr_sum += v.resting_hr;
    }
    p.distance_km_sum += v.distance_km;
    p.active_cal_sum += v.active_cal;
    p.steps_sum += v.steps;
 
    p.distance_km_avg = p.distance_km_sum/p.count;
    p.active_cal_avg = p.active_cal_sum/p.count;
    p.heart_rate_avg = p.heart_rate_sum/p.hr_count;
    p.resting_hr_avg = p.resting_hr_sum/p.rhr_count;
    p.steps_avg = p.steps_sum/p.count;
 
    return p;
  };
 
  var reduce_remove = function(p, v, nf) {
    --p.count;
    if(p.dates.indexOf(v.Date) == -1) {
      --p.unique_dates;
      p.dates.push(v.Date);
    }
    if(v.heart_rate >0) {
      --p.hr_count;
      p.heart_rate_sum -= v.heart_rate;
    }
    if(v.resting_hr >0) {
      --p.rhr_count;
      p.resting_hr_sum -= v.resting_hr;
    }
    p.distance_km_sum -= v.distance_km;
    p.active_cal_sum -= v.active_cal;
    p.steps_sum -= v.steps;
 
    p.distance_km_avg = p.distance_km_sum/p.count;
    p.active_cal_avg = p.active_cal_sum/p.count;
    p.heart_rate_avg = p.heart_rate_sum/p.hr_count;
    p.resting_hr_avg = p.resting_hr_sum/p.rhr_count;
    p.steps_avg = p.steps_sum/p.count;
    return p;
  };
 
 
  //DEFINE GROUPS
  var group_hour = hour.group().reduce(reduce_add, reduce_remove, reduce_init);
  var group_date = date.group().reduce(reduce_add, reduce_remove, reduce_init);
  var group_weekday = weekday.group().reduce(reduce_add, reduce_remove, reduce_init);
  var group_name = name.group().reduce(reduce_add, reduce_remove, reduce_init);
 
 
  //DEFINE CHARTS
  var person_chart = dc.pieChart("#project_steps_name");
  var daily_chart = dc.lineChart("#project_daily_chart");
  var weekly_chart = dc.rowChart("#project_weekly_chart");
  var hourly_chart = dc.lineChart("#project_hourly_chart");
  var hr_activecal_chart = dc.bubbleChart("#project_heartrate_active");
  var hourly_hr_chart = dc.lineChart("#project_heartrate");
 
 
  //DEFINE RESET BUTTON AND FUNCTION
  var reRenderNull = function(){
    person_chart.filter(null);
    daily_chart.filter(null);
    weekly_chart.filter(null);
    hourly_chart.filter(null);
    hourly_hr_chart.filter(null);
    hr_activecal_chart.filter(null);
  }
 
  var showButton = function() {
      if(person_chart.filters().length > 0 || daily_chart.filters().length > 0 || weekly_chart.filters().length > 0 ||  hourly_chart.filters().length > 0 || hourly_hr_chart.filters().length > 0 || hr_activecal_chart.filters().length > 0 ){
          d3.select(".project_btn")
            .remove();
          d3.select("#project_resetButton")
            .append("button")
            .attr("type","button")
            .attr("class","project_btn")
            .append("div")
            .attr("class","label")
            .text(function(d) { return "Reset";})
            .on("click", function(){
                reRenderNull();
                dc.redrawAll();
            });
      } else {
          d3.select(".project_btn")
            .remove();
      };
  };
 
 
  //DEFINE SLIDER FUNCTION
   var switchYAxis = new Slider("#switchYAxis", {
     ticks: [0, 1, 2, 3],
     ticks_labels: ['steps', 'distance', 'calories', 'HR'],
     ticks_snap_bounds: 1
   });
 
   switchYAxis.on("slide", function(e) {
     if(e == 0){
        hourly_chart
          .yAxisLabel('Number of Active Calories')
          .valueAccessor(function (d) { return d.value.active_cal_sum; });
        daily_chart
          .yAxisLabel('Number of Steps')
          .valueAccessor(function (d) { return d.value.steps_sum; });
        weekly_chart
           .valueAccessor(function(d) { return Math.round(d.value.steps_sum)/(2*d.value.unique_dates);});
     } else if (e == 1){
        hourly_chart
          .yAxisLabel('Number of Active Calories')
          .valueAccessor(function (d) { return d.value.active_cal_sum; });
        daily_chart
          .yAxisLabel('Distance Walked (km)')
          .valueAccessor(function (d) { return d.value.distance_km_sum; });
        weekly_chart
           .valueAccessor(function(d) { return Math.round(d.value.distance_km_sum)/(2*d.value.unique_dates);});
     } else if (e == 2) {
        hourly_chart
          .yAxisLabel('Number of Active Calories')
          .valueAccessor(function (d) { return d.value.active_cal_sum; });
        daily_chart
          .yAxisLabel('Number of Active Calories')
          .valueAccessor(function (d) { return d.value.active_cal_sum; });
        weekly_chart
           .valueAccessor(function(d) { return Math.round(d.value.active_cal_sum)/(2*d.value.unique_dates);});
     } else {
        hourly_chart
         .yAxisLabel('Average Heart Rate')
         .valueAccessor(function (d) { return d.value.heart_rate_avg; });
        daily_chart
          .yAxisLabel('Average Heart Rate')
          .valueAccessor(function (d) { return d.value.heart_rate_avg; });
        weekly_chart
          .valueAccessor(function(d) { return Math.round(d.value.heart_rate_avg) ;});
     }
     daily_chart.render();
     weekly_chart.render();
     hourly_chart.render();
   });
 
 
  //DEFINE SPECIFIC CHARTS
  person_chart
     .width(500)
     .height(250)
     .dimension(name)
     .group(group_name)
     .valueAccessor(function (d) { return d.value.steps_sum; })
     .radius(100)
     .innerRadius(25)
     .renderLabel(true)
     .label(function (d) {return (d.data.key); })
     .on('filtered', function(){ showButton(); });
 
  hourly_chart
     .renderArea(true)
     .width(750)
     .height(500)
     .margins({top: 20, right: 40, bottom: 30, left: 60})
     .mouseZoomable(true)
     .transitionDuration(1000)
     .brushOn(true)
     .elasticY(true)
     .elasticX(true)
     .x( d3.scale.linear().domain(hours) )
     .xUnits(dc.units.fp.precision(1))
     .dimension(hour)
     .group(group_hour)
     .valueAccessor(function (d) { return d.value.heart_rate_avg; })
     .xAxisLabel('Hour')
     .yAxisLabel('Average Heart Rate')
     .on('filtered', function(){ showButton(); });
 
  daily_chart
    .renderArea(true)
    .width(750)
    .height(500)
    .margins({top: 20, right: 40, bottom: 30, left: 60})
    .brushOn(true)
    .elasticY(true)
    .elasticX(true)
    .dimension(date)
    .group(group_date)
    .valueAccessor(function (d) { return d.value.heart_rate_avg; })
    .x( d3.scale.ordinal().domain(dates) )
    .xUnits(dc.units.ordinal)
    .xAxisLabel('Date')
    .yAxisLabel('Average Heart Rate')
    .on('filtered', function(){ showButton(); });
 
  weekly_chart
    .width(750)
    .height(500)
    .margins({top: 20, right: 40, bottom: 30, left: 60})
    .colors(["#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"])
    .elasticX(true)
    .dimension(weekday)
    .group(group_weekday)
    .keyAccessor(function(d) { return d.key;})
    .valueAccessor(function(d) { return Math.round(d.value.heart_rate_avg);})
    .on('filtered', function(){ showButton(); });
 
   hr_activecal_chart
     .width(750)
     .height(500)
     .margins({top: 20, right: 40, bottom: 30, left: 60})
     .dimension(date)
     .group(group_date)
     .keyAccessor(function(d) { return Math.round(d.value.steps_sum);})
     .valueAccessor(function(d) { return Math.round(d.value.active_cal_sum);})
     .colorAccessor(function (d) {return Math.abs(d.value.heart_rate_avg);})
     .radiusValueAccessor(function (d) {return Math.abs(d.value.distance_km_sum);})
     .maxBubbleRelativeSize(0.1)
     .mouseZoomable(true)
     .x(d3.scale.linear().domain([0,35000]))
     .r(d3.scale.linear().domain([0,20]))
     .y(d3.scale.linear().domain([0,3000]))
     .xAxisLabel('Number of Steps')
     .yAxisLabel('Number of Active Calories')
     .colorDomain([40,180])
     .elasticY(true)
     .on('filtered', function(){ showButton(); });
 
  hourly_hr_chart
     .renderArea(true)
     .width(750)
     .height(500)
     .margins({top: 20, right: 40, bottom: 30, left: 60})
     .mouseZoomable(true)
     .transitionDuration(1000)
     .brushOn(true)
     .elasticX(true)
     .x( d3.scale.linear().domain(hours) )
     .xUnits(dc.units.fp.precision(1))
     .legend(dc.legend().x(100).y(30).itemHeight(20).gap(5))
     .dimension(hour)
     .group(group_hour, 'Active HR - Resting HR')
     .valueAccessor(function (d) { return d.value.heart_rate_avg - d.value.resting_hr_avg; })
     .stack(group_hour, 'Number of Steps', function (d) { return d.value.active_cal_avg; })
     .xAxisLabel('Hour')
     .yAxisLabel('Average Heart Rate Difference')
     .on('filtered', function(){ showButton(); });
 
 
  dc.renderAll();
});