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


d3.json("http://tranquil-peak-82564.herokuapp.com/api/v1.0/data/iris/", function(remote_json){
  
  window.remote_json = remote_json;
  
  // crossfilter
  var cf            = crossfilter(remote_json);
  
  // dimension; round to the nearest .5
  var sepal_length  = cf.dimension(function(d){return Math.round(d.sepal_length * 2)/2; }); 
  var sepal_width   = cf.dimension(function(d){return Math.round(d.sepal_width * 4)/4; }); 
  var petal_length  = cf.dimension(function(d){return Math.round(d.petal_length * 2)/2; }); 
  var petal_width   = cf.dimension(function(d){return Math.round(d.petal_width * 4)/4; }); 
  var species       = cf.dimension(function(d){return d.species;});

  // groups
  var sepal_length_sum = sepal_length.group().reduceSum(function(d){ return d.sepal_length; });
  var sepal_width_sum  = sepal_width.group().reduceSum(function(d){ return d.sepal_width; });
  var petal_length_sum = petal_length.group().reduceSum(function(d){ return d.petal_length; });
  var petal_width_sum  = petal_width.group().reduceSum(function(d){ return d.petal_width; });
  var species_sum      = species.group().reduceCount();
  var group_sw = sepal_width.group();
  
  var reduce_init = function() { return {
    "count": 0,
    "petal_length_sum": 0, 
    "petal_length_avg": 0, 
    "petal_width_sum": 0, 
    "petal_width_avg": 0, 
    "sepal_length_sum":0, 
    "sepal_length_avg":0,
    "sepal_width_sum":0, 
    "sepal_width_avg":0 };

  };

  var reduce_add = function(p, v, nf) {
    ++p.count;
    p.petal_length_sum += v.petal_length
    p.petal_length_avg = p.petal_length_sum/p.count
    p.petal_width_sum += v.petal_width
    p.petal_width_avg = p.petal_width_sum/p.count
    p.sepal_length_sum += v.sepal_length
    p.sepal_length_avg = p.sepal_length_sum/p.count
    p.sepal_width_sum += v.sepal_width
    p.sepal_width_avg = p.sepal_width_sum/p.count

    return p;
  };

  var reduce_remove = function(p, v, nf) {
    --p.count;
    p.petal_length_sum -= v.petal_length
    p.petal_length_avg = p.petal_length_sum/p.count
    p.petal_width_sum -= v.petal_width
    p.petal_width_avg = p.petal_width_sum/p.count
    p.sepal_length_sum -= v.sepal_length
    p.sepal_length_avg = p.sepal_length_sum/p.count
    p.sepal_width_sum -= v.sepal_width
    p.sepal_width_avg = p.sepal_width_sum/p.count

    return p;
  };

  group_sw.reduce(reduce_add, reduce_remove, reduce_init);
  
  /* implement unique species name extraction */
  window.species_names = _.chain(remote_json).pluck("species").uniq().value();

  group_sw.top(Infinity)
    .forEach(function(d,i){ console.log(JSON.stringify(d)); });
  
  var petal_length_bubble = dc
    .bubbleChart("#dcjs_flower_bubble_chart","bar")
    .width(600)
    .height(400)
    .transitionDuration(1000)
//    .dimension(sepal_width)
    .dimension(sepal_width)
    .group(group_sw)
    .keyAccessor(function (p) {return p.value.petal_length_avg;})
    .valueAccessor(function (p) {return p.value.petal_width_avg;})
//    .radiusValueAccessor(function (p) {return p.value.sepal_length_avg;})
    .radiusValueAccessor(function (p) {return p.value.count;})
//    .maxBubbleRelativeSize(0.2)
    .maxBubbleRelativeSize(0.03)
    .x(d3.scale.linear().domain([0, 8]))
    .y(d3.scale.linear().domain([0, 3]))
//    .r(d3.scale.linear().domain([4, 10]))
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
  
  var species_chart = dc
    .barChart("#dcjs_flower_species_chart", "bar")
    .width(250)
    .height(200)
    .dimension(species)
    .group(species_sum)
    .centerBar(true)
    .elasticY(true)
    .x(d3.scale.ordinal().domain(species_names))
    .xUnits(dc.units.ordinal);

  var sepal_length_chart = dc
    .barChart("#dcjs_flower_sepal_length_chart", "bar")
    .width(250)
    .height(200)
    .dimension(sepal_length)
    .group(sepal_length_sum)
    .centerBar(true)
    .elasticY(true)
    .x( d3.scale.linear().domain([3,10]) )
    .xUnits(dc.units.fp.precision(.5));
  
   var sepal_width_chart = dc
    .barChart("#dcjs_flower_sepal_width_chart", "bar")
    .width(250)
    .height(200)
    .dimension(sepal_width)
    .group(sepal_width_sum)
    .centerBar(true)
    .elasticY(true)
    .x( d3.scale.linear().domain([1.5,5]) )
    .xUnits(dc.units.fp.precision(.25));
   
   var petal_length_chart = dc
    .barChart("#dcjs_flower_petal_length_chart", "bar")
    .width(250)
    .height(200)
    .dimension(petal_length)
    .group(petal_length_sum)
    .centerBar(true)
    .elasticY(true)
    .x( d3.scale.linear().domain([0,7]) )
    .xUnits(dc.units.fp.precision(.5));   
  
   var petal_width_chart = dc
    .barChart("#dcjs_flower_petal_width_chart", "bar")
    .width(250)
    .height(200)
    .dimension(petal_width)
    .group(petal_width_sum)
    .centerBar(true)
    .elasticY(true)
    .x( d3.scale.linear().domain([-0.25,3]) )
    .xUnits(dc.units.fp.precision(.25));  

  var species_pie = dc
    .pieChart("#dcjs_flower_species_chart", "pie")
    .radius(100)
    .width(250)
    .height(200)
    .dimension(species)
    .group(species_sum)
    .renderLabel(true)
    .label(function (d) { return (d.data.key + " (n=" + d.value + ")"); });

  var sepal_length_pie = dc
    .pieChart("#dcjs_flower_sepal_length_chart", "pie")
    .radius(100)
    .width(250)
    .height(200)     
    .dimension(sepal_length)
    .group(sepal_length_sum)
    .renderLabel(true)
    .label(function (d) { return (d.data.key + " (n=" + Math.round(d.value) + ")"); });

   var sepal_width_pie = dc
    .pieChart("#dcjs_flower_sepal_width_chart", "pie")
    .radius(100)
    .width(250)
    .height(200)         
    .dimension(sepal_width)
    .group(sepal_width_sum)
    .renderLabel(true)
    .label(function (d) { return (d.data.key + " (n=" + Math.round(d.value) + ")"); });
   
   var petal_length_pie = dc
    .pieChart("#dcjs_flower_petal_length_chart", "pie")
    .radius(100)
    .width(250)    
    .height(200)     
    .dimension(petal_length)
    .group(petal_length_sum)
    .renderLabel(true)
    .label(function (d) { return (d.data.key + " (n=" + Math.round(d.value) + ")"); });
    
   var petal_width_pie = dc
    .pieChart("#dcjs_flower_petal_width_chart", "pie")
    .radius(100)
    .width(250)
    .height(200)     
    .dimension(petal_width)
    .group(petal_width_sum)
    .renderLabel(true)
    .label(function (d) { return (d.data.key + " (n=" + Math.round(d.value) + ")"); });


  //add reRender and filter functions for triggered actions
  var reRender = function(e){
    if (isPie_s == 1 && e != "s") { species_pie.render(); } 
    else { if (e != "s"){ species_chart.render(); }};
    if (isPie_sl == 1 && e != "sl") { sepal_length_pie.render(); } 
    else { if (e != "sl"){ sepal_length_chart.render(); }};
    if (isPie_sw == 1 && e != "sw") { sepal_width_pie.render(); } 
    else { if (e != "sw"){ sepal_width_chart.render(); }};
    if (isPie_pl == 1 && e != "pl") { petal_length_pie.render(); } 
    else { if (e != "pl"){ petal_length_chart.render(); }};
    if (isPie_pw == 1 && e != "pw") { petal_width_pie.render(); } 
    else { if (e != "pw"){ petal_width_chart.render(); }};
  }
  
  var reRenderNull = function(){
    petal_length_bubble.filter(null);
    species_chart.filter(null);
    sepal_length_chart.filter(null);
    sepal_width_chart.filter(null);
    petal_length_chart.filter(null); 
    petal_width_chart.filter(null); 
    species_pie.filter(null);
    sepal_length_pie.filter(null); 
    sepal_width_pie.filter(null);
    petal_length_pie.filter(null); 
    petal_width_pie.filter(null); 
    petal_length_bubble.render();
    dc.renderAll();
  }
  
    var filterAll = function(e){
    if (isPie_s == 1) { species_chart.filter = species_pie.filter; } 
    else { species_pie.filter = species_chart.filter; };
    if (isPie_sl == 1) { sepal_length_chart.filter = sepal_length_pie.filter; } 
    else { sepal_length_pie.filter = sepal_length_chart.filter; };
    if (isPie_sw == 1) {sepal_width_chart.filter = sepal_width_pie.filter; } 
    else { sepal_width_pie.filter = sepal_width_chart.filter; };
    if (isPie_pl == 1) { petal_length_chart.filter = petal_length_pie.filter; } 
    else { petal_length_pie.filter = petal_length_chart.filter; };
    if (isPie_pw == 1) {petal_width_chart.filter = petal_width_pie.filter; } 
    else { petal_width_pie.filter = petal_width_chart.filter; };
    reRender(e);
  }


  /*
  Button fun: reset, toggle and pie/chart switches
  */
  
  //add a reset button as shown in the tutorial
  var showButton = function(){
    if(petal_length_bubble.filters().length > 0 ||
species_chart.filters().length > 0 || sepal_length_chart.filters().length > 0 || sepal_width_chart.filters().length > 0 || petal_length_chart.filters().length > 0 || petal_width_chart.filters().length > 0 || species_pie.filters().length > 0 || sepal_length_pie.filters().length > 0 || sepal_width_pie.filters().length > 0 || petal_length_pie.filters().length > 0 || petal_width_pie.filters().length > 0 ){
        d3.select(".dcjs_flower_btn-btn")
          .remove();      
        d3.select("#dcjs_flower_resetButton")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-btn")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Reset"; })
          .on("click", function(){
              reRenderNull();
          });        
    } else {      
        d3.select(".dcjs_flower_btn-btn")
          .remove();
    };
};

  //add various switches to be shown at start
  var switches = function(){  
    switchBubble();
    switchPie();
    switchSpecies();
    switchSepalLength();
    switchSepalWidth();
    switchPetalLength();
    switchPetalWidth();
  }

  //switch between sepal/petal
  var isSepal = 0;
  var switchBubble = function(){
    if(isSepal == 0){
        d3.select(".dcjs_flower_btn-sepal")
          .remove();      
        d3.select("#dcjs_flower_switchBubble")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-sepal")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Change distribution to sepal length and width"; })
          .on("click", function(){
            petal_length_bubble
              .keyAccessor(function (p) {return p.value.sepal_length_avg;})
              .valueAccessor(function (p) {return p.value.sepal_width_avg;})
              .xAxisLabel('Sepal Length')
              .yAxisLabel('Sepal Width')
              .render();
            isSepal = 1;
            d3.select(".dcjs_flower_btn-sepal")
              .remove();              
            switchBubble();
          });        
    } else {      
        d3.select(".dcjs_flower_btn-sepal")
          .remove();
        d3.select("#dcjs_flower_switchBubble")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-sepal")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Change distribution to petal length and width"; })
          .on("click", function(){
            petal_length_bubble
              .keyAccessor(function (p) {return p.value.petal_length_avg;})
              .valueAccessor(function (p) {return p.value.petal_width_avg;})
              .xAxisLabel('Petal Length')
              .yAxisLabel('Petal Width')
              .render();              
            isSepal = 0;
            d3.select(".dcjs_flower_btn-sepal")
              .remove();
            switchBubble();
          });        
      };
  };

  //switch all figures from bar to chart
  var isPie = 0;
  var switchPie = function(){
    if(isPie == 0){
        d3.select("#dcjs_flower_switchChart")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch ALL to Pie"; })
          .on("click", function(){
              isPie = 1;
              isPie_s = 1;
              isPie_sl = 1;
              isPie_sw = 1;
              isPie_pl = 1;
              isPie_pw = 1;
            //  dc.redrawAll();              
              switches();                
              dc.renderAll("pie");
              d3.select(".dcjs_flower_btn")
                .remove();
          });
    } else {      
        d3.select("#dcjs_flower_switchChart")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch ALL to Bar"; })
          .on("click", function(){
              isPie = 0;
              isPie_s = 0;
              isPie_sl = 0;
              isPie_sw = 0;
              isPie_pl = 0;
              isPie_pw = 0;
        //      dc.redrawAll();
              switches();
              dc.renderAll("bar");
              d3.select(".dcjs_flower_btn")
                .remove();                
          });        
      };
  };

  /*
  switch individual figures
  */
  isPie_s = 0;
  var switchSpecies = function(){
    if(isPie_s == 0){
        d3.select(".dcjs_flower_btn-s")
           .remove();
        d3.select("#dcjs_flower_switchSpecies")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-s")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Species to Pie"; })
          .on("click", function(){
              isPie_s = 1;
              species_pie.filter = species_chart.filter;
              species_pie.render();
              d3.select(".dcjs_flower_btn-s")
                .remove();
              switchSpecies();
          });
    } else {      
        d3.select(".dcjs_flower_btn-s")
           .remove();
        d3.select("#dcjs_flower_switchSpecies")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-s")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Species to Bar"; })
          .on("click", function(){
              isPie_s = 0;
              species_chart.filter = species_pie.filter;
              species_chart.render();
              d3.select(".dcjs_flower_btn-s")
                .remove();
              switchSpecies();
          });        
      };
  };
 
  isPie_sl = 0;
  var switchSepalLength = function(){
    if(isPie_sl == 0){
        d3.select(".dcjs_flower_btn-sl")
           .remove();    
        d3.select("#dcjs_flower_switchSepalLength")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-sl")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Sepal Length to Pie"; })
          .on("click", function(){
              isPie_sl = 1;
              sepal_length_pie.filter = sepal_length_chart.filter;
              sepal_length_pie.render();
              d3.select(".dcjs_flower_btn-sl")
                .remove();
              switchSepalLength();
          });
    } else {      
        d3.select(".dcjs_flower_btn-sl")
           .remove();    
        d3.select("#dcjs_flower_switchSepalLength")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-sl")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Sepal Length to Bar"; })
          .on("click", function(){
              isPie_sl = 0;
              sepal_length_chart.filter = sepal_length_pie.filter;
              sepal_length_chart.render();
              d3.select(".dcjs_flower_btn-sl")
                .remove();
              switchSepalLength();
          });        
      };
  };


  isPie_sw = 0;
  var switchSepalWidth = function(){
    if(isPie_sw == 0){
        d3.select(".dcjs_flower_btn-sw")
           .remove();    
        d3.select("#dcjs_flower_switchSepalWidth")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-sw")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Sepal Width to Pie"; })
          .on("click", function(){
              isPie_sw = 1;
              sepal_width_pie.filter = sepal_width_chart.filter;
              sepal_width_pie.render();
              d3.select(".dcjs_flower_btn-sw")
                .remove();
              switchSepalWidth();
          });
    } else {   
        d3.select(".dcjs_flower_btn-sw")
           .remove();
        d3.select("#dcjs_flower_switchSepalWidth")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-sw")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Sepal Width to Bar"; })
          .on("click", function(){
              isPie_sw = 0;
              sepal_width_chart.filter = sepal_width_pie.filter;
              sepal_width_chart.render();
              d3.select(".dcjs_flower_btn-sw")
                .remove();
              switchSepalWidth();
          });        
      };
  };

  isPie_pl = 0;
  var switchPetalLength = function(){
    if(isPie_pl == 0){
        d3.select(".dcjs_flower_btn-pl")
           .remove();
        d3.select("#dcjs_flower_switchPetalLength")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-pl")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Petal Length to Pie"; })
          .on("click", function(){
              isPie_pl = 1;
              petal_length_pie.filter = petal_length_chart.filter;
              petal_length_pie.render();
              d3.select(".dcjs_flower_btn-pl")
                .remove();
              switchPetalLength();
          });
    } else {   
        d3.select(".dcjs_flower_btn-pl")
           .remove();
        d3.select("#dcjs_flower_switchPetalLength")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-pl")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Petal Length to Bar"; })
          .on("click", function(){
              isPie_pl = 0;
              petal_length_chart.filter = petal_length_pie.filter;
              petal_length_chart.render();
              d3.select(".dcjs_flower_btn-pl")
                .remove();
              switchPetalLength();
          });        
      };
  };

  isPie_pw = 0;
  var switchPetalWidth = function(){
    if(isPie_pw == 0){
        d3.select(".dcjs_flower_btn-pw")
           .remove();
        d3.select("#dcjs_flower_switchPetalWidth")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-pw")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Petal Width to Pie"; })
          .on("click", function(){
              isPie_pw = 1;
              petal_width_pie.filter = petal_width_chart.filter;
              petal_width_pie.render();
              d3.select(".dcjs_flower_btn-pw")
                .remove();
              switchPetalWidth();
          });
    } else {      
        d3.select(".dcjs_flower_btn-pw")
           .remove();
        d3.select("#dcjs_flower_switchPetalWidth")
          .append("button")
          .attr("type","button")
          .attr("class","dcjs_flower_btn-pw")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Switch Petal Width to Bar"; })
          .on("click", function(){
              isPie_pw = 0;
              petal_width_chart.filter = petal_width_pie.filter;
              petal_width_chart.render();
              d3.select(".dcjs_flower_btn-pw")
                .remove();
              switchPetalWidth();
          });        
      };
  };


  //set actions on filter
  petal_length_bubble.on('filtered', function(){
    showButton();
    filterAll();
  });  
  species_chart.on('filtered', function(){
    showButton(); 
    filterAll("s"); 
  });
  sepal_length_chart.on('filtered', function(){
    showButton();
    filterAll("sl");
  });
  sepal_width_chart.on('filtered', function(){
    showButton(); 
    filterAll("sw");
  });
  petal_length_chart.on('filtered', function(){
    showButton(); 
    filterAll("pl");    
  });
  petal_width_chart.on('filtered', function(){
    showButton(); 
    filterAll("pw");     
  });  
  species_pie.on('filtered', function(){
    showButton(); 
    filterAll("s");    
  });
  sepal_length_pie.on('filtered', function(){
    showButton(); 
    filterAll("sl");  
  });
  sepal_width_pie.on('filtered', function(){
    showButton(); 
    filterAll("sw");   
  });
  petal_length_pie.on('filtered', function(){
    showButton(); 
    filterAll("pl");    
  });
  petal_width_pie.on('filtered', function(){
    showButton(); 
    filterAll("pw");    
  });

  //run it all
  switches();
  dc.renderAll("bar");  
});