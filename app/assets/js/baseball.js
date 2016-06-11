//var hist= function(data_in, chart_id, value, chart_title, counttype, axistype) {
var hist= function(data_in, chart_id, value, chart_title, counttype) {

  var margin = {
      "top": 30,
      "right": 30,
      "bottom": 50,
      "left": 30
    },
    width = 900 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([ 0, d3.max(data_in, function(d) {
      return d.value[value];}) ] )
    .range([height, 0]);
    
  d3.select("#" + chart_id).remove();
  
  var div = d3.select("#baseball_container").append("div").attr("id", chart_id);
  
  div.append("h3").text(chart_title);
  
  var svg = div.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bar = svg.selectAll(".bar")
    .data(data_in)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("transform", function(d, i) {
      return "translate(" + x(i / data_in.length) + "," + y(d.value[value]) + ")";
    });

  bar.append("rect")
    .attr("x", 1)
    .attr("width", width / data_in.length - 1)
    .attr("height", function(d) {
      return height - y(d.value[value]);
    });

  var formatCount = d3.format(",.0f");

  bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", (width / data_in.length - 1) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) {
      if (counttype == 0) {
        return formatCount(d.value.count);      
      } else {
        return formatCount(d.value.yearcount);      
      }
    });

  var unique_names = data_in.map(function(d) {
    return d.key;
  });

  var xScale = d3.scale.ordinal().domain(unique_names).rangePoints([0, width]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

  var xTicks = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("font-size", 10)
    .attr("transform", function(d) {
      return "rotate(-50)"
    });

  var yAxis = d3.svg.axis()
    .ticks(5)
    .scale(y)
    .orient("left");

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("font-size", 10);
}

d3.json("https://tranquil-peak-82564.herokuapp.com/api/v1.0/data/baseball/",
  function(error, games_json) {
    var cf = crossfilter(games_json);
    var dim_team = cf.dimension(function(d) { return d.team_id; });
    var dim_ngames = cf.dimension(function(d){ return d.g_all; });
    var dim_year = cf.dimension(function(d){ return d.year; });
    var dim_player = cf.dimension(function(d){ return d.player_id; });
    
    var group_team = dim_team.group();
    var group_year = dim_year.group();
    var group_ngames = dim_ngames.group();
    var group_player = dim_player.group();
    
    var reduce_init = function() {
//      return {"count": 0, "total": 0, "yearcount": 0, "allyears": []};
      return {"count": 0, "total": 0, "minyear": 1871, "maxyear": 2015, "yearcount": 0, "allyears": [], "players": [], "playercount":0};
    }

    var reduce_add = function(p, v, nf) {
      ++p.count;
      p.total += v.g_all;
      p.minyear = Math.max(1871, Math.min(v.year));
      p.maxyear = Math.min(2015, Math.max(v.year));
      
      if (p.allyears.indexOf(v.year) < 0) {
        ++p.yearcount;
        p.allyears.push(v.year);
      }
      if (p.players.indexOf(v.player_id) < 0) {
        ++p.playercount;
        p.players.push(v.player_id);
      }
      return p;
    }

    var reduce_remove = function(p, v, nf) {
      --p.count;
      p.total -= v.g_all;
      p.minyear = Math.max(1871, Math.min(v.year));
      p.maxyear = Math.min(2015, Math.max(v.year));
      if (p.allyears.indexOf(v.year) >= 0) {
        --p.yearcount;
        p.allyears.splice(p.allyears.indexOf(v.year), 1);
      }
      if (p.players.indexOf(v.player_id) >= 0) {
        --p.playercount;
        p.players.splice(p.players.indexOf(v.player_id), 1);
      }
      return p;
  }

    group_team.reduce(reduce_add, reduce_remove, reduce_init);
    group_year.reduce(reduce_add, reduce_remove, reduce_init);
    group_ngames.reduce(reduce_add, reduce_remove, reduce_init);
    group_player.reduce(reduce_add, reduce_remove, reduce_init);
    
    /* build charts here */      
    var render_plots = function(e,f){
      hist(group_team.top(e).filter(function(d) { 
        return d.value.count > 0 & d.value.playercount <=f; }), 
        "appearances_by_team", 
        "count", 
        "# of Player Appearances by Team", 
        0
      );

      hist(group_team.top(e).filter(function(d) { 
        return d.value.yearcount > 0 & d.value.playercount <=f; }), 
        "years_by_team", 
        "yearcount", 
        "# of Year Appearances by Team",
        1
      );
      
      hist(group_year.top(e).filter(function(d) { 
        return d.value.count > 0 & d.value.playercount <=f; }), 
        "players_by_year", 
        "count", 
        "# of Player Appearances by Year",
        0
      );

      hist(group_ngames.top(e).filter(function(d) { 
        return d.value.count > 0 & d.value.playercount <=f; }), 
        "appearances_by_games_played", 
        "count", 
        "# of Appearances by Games Played",
        0
      );
    };    


    /* build sliders here */      
    var n_games_slider = new Slider(
      "#n_games_slider", {
        "id": "n_games_slider",
        "min": 0,
        "max": 100,
        "range": true,
        "value": [0, 100]
      });
    
      var years_slider = new Slider(
      "#years_slider", {
        "id": "years_slider",
        "min": 1871,
        "max": 2015,
        "range": true,
        "value": [1871, 2015]
      });

      var team_slider = new Slider(
      "#team_slider", {
        "id": "team_slider",
        "min": 5,
        "max": 75
      });
      
      var player_slider = new Slider(
      "#player_slider", {
        "id": "player_slider",
        "min": 1,
        "max": 50,
        "value":40
    });
      
    // this is an event handler for a particular slider
    n_games_slider.on("slide", function(e) {
      d3.select("#n_games_slider_txt").text("min: " + e[0] + ", max: " + e[1]);
      dim_ngames.filter(e);
      render_plots(Infinity,Infinity); 
    });

    years_slider.on("slide", function(e) {
      d3.select("#years_slider_txt").text("min: " + e[0] + ", max: " + e[1]);
      dim_year.filter(e);
      render_plots(Infinity,Infinity); 
    });
     
    team_slider.on("slide", function(e) {
      d3.select("#team_slider_txt").text(e);
      render_plots(e,Infinity); 
    });
    
    player_slider.on("slide", function(e) {
      d3.select("#player_slider_txt").text(e);
      render_plots(Infinity,e); 
    });

    render_plots(Infinity,Infinity); 
    
  });
