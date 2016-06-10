var Dessert = function() {
  this.data = {
  	"name": "Dessert",
    "children": [{
          "id": "0001",
          "type": "donut",
          "name": "Cake",
          "ppu": 0.55,
          "children": [{
              "id": "1011",
          		"name": "batters",
	            "children": [{
    		        "id": "0011",
              		"name": "Regular"
            	}, {
              		"id": "0012",
              		"name": "Chocolate"
           		}, {
              		"id": "0013",
              		"name": "Blueberry"
            	}, {
              		"id": "0014",
              		"name": "Devil's Food"
            	}]
          	}, {
              "id": "1012",
          		"name": "toppings",
            	"children": [{
              		"id": "5011",
              		"name": "None"
            	}, {
             		"id": "5012",
              		"name": "Glazed"
            	}, {
              		"id": "5015",
              		"name": "Sugar"
            	}, {
              		"id": "5017",
              		"name": "Powdered Sugar"
            	}, {
              		"id": "5016",
              		"name": "Chocolate with Sprinkles"
            	}, {
              		"id": "5013",
              		"name": "Chocolate"
            	}, {
              		"id": "5014",
              		"name": "Maple"
            	}]
        	}]
        },
        {
          "id": "0002",
          "type": "donut",
          "name": "Raised",
          "ppu": 0.55,
          "children": [{
              "id": "1021",
           		"name": "batters",
              "children": [{
                 "id": "0021",
              		"name": "Regular"
              }]
          },
          {
            "id": "1022",
          	"name": "toppings",
  	        "children": [{
              "id": "5021",
              "name": "None"
            }, {
              "id": "5022",
              "name": "Glazed"
            }, {
              "id": "5025",
              "name": "Sugar"
            }, {
              "id": "5023",
              "name": "Chocolate"
            }, {
              "id": "5024",
              "name": "Maple"
            }]
          }]
          },
        {
          "id": "0003",
          "type": "donut",
          "name": "Old Fashioned",
          "ppu": 0.55,
          "children": [{
            "id": "1031",
          	"name":"batters",
            "children": [{
               "id": "0031",
              "name": "Regular"
            }, {
              "id": "1032",
              "name": "Chocolate"
            }]
          },
          	{
	            "id": "1032",
  	          "name": "toppings",
            	"children": [{
                  "id": "5031",
                  "name": "None"
                }, {
                  "id": "5032",
                  "name": "Glazed"
                }, {
                  "id": "5033",
                  "name": "Chocolate"
                }, {
                  "id": "5034",
                  "name": "Maple"
                }]
        		}]
            },
        {
          "id": "0004",
          "type": "bar",
          "name": "Bar",
          "ppu": 0.75,
          "children": [{
            "id": "1041",
            "name": "batters",
             "children": [{
                "id": "0041",
                "name": "Regular"
              }]
            },
           	{
	            "id": "1042",            
            	"name": "toppings",
                "children": [{
                  "id": "5043",
                  "name": "Chocolate"
                }, {
                  "id": "5044",
                  "name": "Maple"
                }]
            },
            {
	            "id": "1043",            
	            "name":"fillings",
  	          "children": [{
    	          "id": "7041",
      	        "name": "None",
        	      "addcost": 0
            }, {
          	    "id": "7042",
            	  "name": "Custard",
              	"addcost": 0.25
            }, {
    	          "id": "7043",
      	        "name": "Whipped Cream",
        	      "addcost": 0.25
            }]
          }]
        },
        {
          "id": "0005",
          "type": "twist",
          "name": "Twist",
          "ppu": 0.65,
          "children": [{
	          "id": "1051",            
            "name": "batters",
            "children": [{
              "id": "0051",
              "name": "Regular"
            }]
            },
            {
	          "id": "1052",            
            "name":"toppings",
            "children": [{
              "id": "5052",
              "name": "Glazed"
            }, {
              "id": "5055",
              "name": "Sugar"
            }]
            }
          ]
        },
        {
          "id": "0006",
          "type": "filled",
          "name": "Filled",
          "ppu": 0.75,
          "children": [{
	  	      "id": "1061",            
          	"name": "batters",
            "children": [{
              	"id": "0061",
              	"name": "Regular"
            }]
          	}, {
		  	      "id": "1062",            
          		"name": "toppings",
            	"children": [{
              		"id": "5062",
              		"name": "Glazed"
            	}, {
              		"id": "5067",
              		"name": "Powdered Sugar"
            	}, {
            		"id": "5063",
            		"name": "Chocolate"
            	}, {
             		"id": "5064",
              		"name": "Maple"
           	 	}]
          	}, {
		  	      "id": "1063",            
	          	"name": "fillings",
            	"children": [{
              		"id": "7062",
              		"name": "Custard",
              		"addcost": 0
            	}, {
              		"id": "7063",
              		"name": "Whipped Cream",
              		"addcost": 0
            	}, {
              		"id": "7064",
              		"name": "Strawberry Jelly",
              		"addcost": 0
            	}, {
            	  	"id": "7065",
              		"name": "Rasberry Jelly",
              		"addcost": 0
            	}]
          	}]
        }
    ]}};

//MODIFIABLE VARIABLES
var height = 1000,
  	width = 1000,
    r = 5, //for node circle
 		radius = 300, //for tree
	  i = 0,
	  duration = 750;
var search_term = "Cake";

//setup
var dessert_min = (new Dessert()).data;

var svg = d3
  .select("#hierarchy")
  .append("svg")
  .attr("height", radius * 2 )
  .attr("width", radius * 2)
  .append("g")
  .attr("transform", "translate(" + radius + "," + radius + ")");

var tree = d3
  .layout
  .tree()
  .size([360, radius - 120])
  .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

//// radial code taken from beautiful example! http://jsfiddle.net/nrabinowitz/wxW3q/


var diagonal = d3
  .svg
  .diagonal
  .radial()
  .projection(function(d) {
    return [d.y, d.x / 180 * Math.PI];
  });
//For displaying red path
function findInPath(source, text) {
  if (source.name.search(text) > 0) {
    return true;
  } else if (source.children || source._children) {
    var c = source.children ? source.children : source._children;
    for (var i = 0; i < c.length; i++) {
      if (findInPath(c[i], text)) {
        return true;
      }
    }
  }
  return false;
}

var linkFilter = function(d) {
  return findInPath(d.target, search_term)
}

//set position of initial node and initialize tree
dessert_min.x0 = height / 2;
dessert_min.y0 = 0;
update(dessert_min);

//function to update tree upon clicks
function update(source) {
  var nodes = tree.nodes(dessert_min);
  var links = tree.links(nodes);

  var node = svg.selectAll("g.node")
    .data(nodes, function(d) {
      return d.id || (d.id = ++i);
    });

	//node behavior while "loading data"
  var nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .on("click", click)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)

  nodeEnter.append("circle")
    .attr("r", 1e-6)
  nodeEnter.append("text")
    .style("fill-opacity", 1e-6);
  nodeEnter.select("circle")
  	.filter(function(d) {
      return findInPath(d, search_term)
    })
    .style("fill", function(d) {
      return d._children ? "red" : "#faa";
    });

	//node behavior once data is loaded
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) {
     return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
    })
  nodeUpdate.select("circle")
  	.filter(function(d) {
      return findInPath(d, search_term)
    })
    .style("fill", function(d) {
      return d._children ? "red" : "#faa";
    });
  nodeUpdate.select("circle")
  	.filter(function(d) {
      return !findInPath(d, search_term)
    })
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    });
  nodeUpdate.select("circle")
    .attr("r", r)
    .style("stroke", "steelblue")
    .style("stroke-width", "1.5px")    
  nodeUpdate.select("text")
    .text(function(d) {return d.name; })
    .attr("x", function(d) {
      return d.children || d._children ? 13 : 15;
    })
    .attr("y", function(d) {
      return d.children || d._children ? -13 : 0;
    })
//    .attr("dy", "-0.35em")
    .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start";
    })
    .attr("transform", function(d) {
    	return d.x < 180 ? 
      "translate(20)" : d.children || d._children ? 
      "rotate(180)translate(-" + (d.name.length) + ")" : "rotate(180)translate(-" + (d.name.length + 85) + ")"; })
		.style("fill-opacity", 1)
    .style("font", "10px sans-serif")
    .style("fill", "black")
    .style("stroke-width", ".01px");
    
	//node behavior when data is "leaving"
	var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) {
     return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
    })
    .remove();
  nodeExit.select("circle")
    .attr("r", 1e-6);
  nodeExit.select("text")
    .style("fill-opacity", 1e-6);


  var link = svg.selectAll("path.link")
    .data(links, function(d) {
      return d.target.id;
    });

  link.enter()
  	.insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .style("fill", "none")
    .style("stroke-width", "1.5px");

  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .remove();

link.filter(linkFilter).style("stroke", "red");
link.filter(function(d){return !linkFilter(d);}).style("stroke", "ccc");

	//update location
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });

}

function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function mouseover (d) { 
  		var moused = d3.select(this);
      moused.select("circle")
		    .attr("r", r * 1.5)
      moused.select("text")
        .attr("x", function(d) {
          return d.children || d._children ? 13 : 15;
        })
        .attr("y", function(d) {
          return d.children || d._children ? -20 : 0;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
		    .style("font", "12px sans-serif")
        .style("stroke-width", ".05px");
        
			if(typeof d.ppu != "undefined") {
        moused.select("text")
          .text(function(d) {
                 return d.name + " (ppu: " + d.ppu + ")";              
          })
          .style("fill", "blue")
        moused.select("circle")
	        .style("stroke", "blue");
			} else if(typeof d.addcost != "undefined") {
        moused.select("text")
          .text(function(d) {
                return d.name + " (+cost: " + d.addcost + ")";      
          })
          .style("fill", "red")
		    .attr("transform", function(d) {
    			return d.x < 180 ? 
      		"translate(20)" : d.children || d._children ? 
      		"rotate(180)translate(-" + (d.name.length) + ")" : "rotate(180)translate(-" + (d.name.length + 180) + ")"; })
        moused.select("circle")
	        .style("stroke", "red");
			} else {
        moused.select("text")
          .text(function(d) {
                 return d.name            
          })
          .style("fill", "black")
      }
      moused.select("g")
      	.style("stroke", "red");
}

function mouseout (d) { 
  		var moused = d3.select(this);
      moused.select("text")
        .text(function(d) {
        		return d.name;
        })
        .attr("x", function(d) {
          return d.children || d._children ? 13 : 15;
        })
        .attr("y", function(d) {
          return d.children || d._children ? -13 : 0;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
		    .attr("transform", function(d) {
    			return d.x < 180 ? 
      		"translate(20)" : d.children || d._children ? 
      		"rotate(180)translate(-" + (d.name.length) + ")" : "rotate(180)translate(-" + (d.name.length + 85) + ")"; })
        .style("fill", "black")
		    .style("font", "10px sans-serif")
        .style("stroke-width", ".01px");
      moused.select("circle")
		    .attr("r", r)
        .style("stroke", "steelblue");
		}
