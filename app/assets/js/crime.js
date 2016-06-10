// C3 init
var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var hours = ["12:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM", "10:00PM", "11:00PM"];

var crimetypes = ["Arson", "Assault", "Burglaries", "Conduct", "Dui", "Drugs", "Drunkenness", "Theft", "Missing", "Prostitution", "Vandalism", "Vehicle"];
var neighborhoods = ["MISSION", "NORTHERN", "RICHMOND", "SOUTHERN", "TENDERLOIN"];


var year_neighborhood = [
  ["BAYVIEW", "CENTRAL", "INGLESIDE", "MISSION", "NORTHERN", "PARK", "RICHMOND", "SOUTHERN", "TARAVAL", "TENDERLOIN"],
  [13617, 13061, 12135, 19117, 15838, 7554, 6825, 24409, 10351, 16954],
  [14076, 12170, 12351, 18121, 14263, 6912, 6500, 26049, 9310, 13773],
  [13914, 12757, 11934, 18237, 14655, 7532, 6662, 24708, 9876, 12424],
  [14505, 14033, 12519, 18788, 16341, 8769, 7707, 25890, 10515, 11791],
  [14792, 14783, 13196, 21157, 18112, 9456, 8478, 29240, 10709, 12888],
  [13885, 17342, 12838, 19443, 18412, 9332, 8020, 28871, 10528, 11490],
  [	14416, 18427, 13178, 18368, 19886, 9253, 9001, 29818, 11792, 10609]
];

var crimetypes_neighborhood = [
	["Arson", 210, 188, 100, 240, 84],
  ["Assault", 13474, 9457, 3576, 14807, 9075],
  ["Burglaries", 4051, 6371, 3027, 5906, 1715],
  ["Disorderly Conduct", 1186, 449, 97, 575, 1206],
  ["DUI", 535, 280, 490, 456, 142],
  ["Drugs", 7395, 4680, 1166, 9123, 16325],
  ["Drunkenness", 909, 362, 201, 1213, 636],
  ["Theft", 22876, 36615, 13970, 57908, 12037],
  ["Missing Person", 4133, 2235, 1523, 4752, 1204],
  ["Prostitution", 3480, 1281, 19, 269, 453],
  ["Vandalism", 6441, 6117, 3602, 8706, 1987],
  ["Vehicle Theft", 6084, 5036, 3085, 3789, 725]
];

var crimetypes_dayofweek = [
  ["Arson",241,256,263,243,259,249,246],
  ["Assault",14537,12429,12065,12114,11942,13067,14206],
  ["Burglaries",4920,5846,6001,6066,6023,6897,5491],
  ["Disorderly Conduct",620,736,761,769,633,554,662],
  ["DUI",664,378,310,341,395,493,679],
  ["Drugs",6002,6944,8180,9053,8195,7269,6425],
  ["Drunkenness",990,625,573,614,599,741,937],
  ["Theft",32076,30742,31649,32447,32459,36730,36376],
  ["Missing Person",3818,4470,4364,4427,4459,5854,4713],
  ["Prostitution",503,484,939,1107,1336,1045,829],
  ["Vandalism",8126,7180,7119,7188,7122,8632,8812],
  ["Vehicle Theft",6077,5912,5875,5929,5988,7008,6539]
];

var hours_neighborhood = [
  ["MISSION", 5728, 6152, 5461, 3473, 2274, 1658, 1586, 2565, 3829, 4531, 4740, 4922, 7591, 6132, 6166, 6620, 7005, 7930, 8197, 7880, 7436, 6839, 7433, 7576],
  ["NORTHERN", 5151, 4558, 4246, 2894, 1982, 1407, 1631, 2210, 3949, 4234, 4474, 4711, 6731, 5250, 5607, 5806, 6242, 6672, 7443, 7482, 7057, 6320, 6876, 6468],
  ["RICHMOND", 2468, 1636, 1450, 970, 574, 469, 566, 1022, 1839, 2199, 2380, 2556, 4019, 2804, 2877, 2959, 3065, 3204, 3440, 3213, 2883, 2628, 2702, 2353],
  ["SOUTHERN", 6982, 5996, 5176, 3410, 2255, 1697, 2007, 3486, 6084, 7321, 8134, 8403, 10950, 9789, 10186, 10289, 11017, 12227, 13215, 12599, 11390, 9866, 9869, 9077],
  ["TENDERLOIN", 2772, 2433, 2284, 1679, 1104, 896, 2112, 2941, 3134, 3282, 3659, 3806, 4599, 4744, 5333, 5599, 6171, 6289, 5788, 5244, 4679, 4066, 4309, 3835]
];

var hours_totalcrime =  ["Total", 39969, 33784, 30279, 20495, 13638, 10397, 12790, 20871, 34819, 39240, 41932, 42744, 60737, 49612, 51591, 54447, 57391, 62725, 65898, 62635, 57468, 51247, 53597, 50110];


var hours_crimetype = [
  ["Arson", 63, 117, 108, 121, 101, 94, 66, 48, 33, 34, 42, 34, 57, 42, 41, 49, 66, 66, 62, 65, 105, 60, 118, 115],
  ["Assault", 3410, 4211, 4947, 2810, 1672, 1053, 1142, 1565, 2704, 3105, 3437, 3649, 4759, 4123, 4292, 4373, 4592, 4682, 4748, 4697, 4482, 4667, 4755, 4452],
  ["Burglaries", 1061, 1115, 1159, 1157, 1117, 975, 887, 1172, 2040, 2113, 1805, 1722, 2250, 1509, 1559, 1790, 2018, 2675, 2808, 2368, 2024, 1914, 1708, 1627],
  ["Disorderly Conduct", 151, 190, 187, 102, 59, 65, 458, 636, 397, 286, 204, 151, 177, 202, 166, 143, 132, 138, 146, 130, 96, 107, 148, 162],
  ["Dui", 228, 416, 400, 247, 96, 46, 27, 33, 24, 33, 23, 14, 28, 31, 35, 52, 59, 105, 111, 129, 168, 179, 239, 350],
  ["Drugs", 1096, 1296, 1026, 761, 516, 292, 270, 971, 1512, 1861, 2131, 2245, 2421, 3054, 3259, 3516, 3846, 4194, 3794, 3282, 2724, 2098, 2481, 2437],
  ["Drunkenness", 206, 392, 450, 210, 101, 45, 29, 75, 96, 101, 108, 127, 161, 152, 161, 164, 209, 226, 288, 266, 267, 320, 360, 375],
  ["Theft", 7276, 6402, 4440, 2679, 1629, 1311, 1984, 2869, 5208, 6754, 8309, 9629, 13069, 11491, 12107, 12717, 13639, 14905, 18208, 18744, 17071, 13852, 12887, 11155],
  ["Missing Person", 888, 531, 484, 297, 166, 168, 406, 1124, 2242, 1918, 1824, 1776, 2330, 1668, 1729, 1943, 1811, 1739, 1754, 1583, 1365, 1407, 1351, 1183],
  ["Prostitution", 428, 670, 460, 303, 167, 153, 51, 107, 46, 57, 53, 53, 112, 77, 120, 90, 77, 112, 236, 475, 475, 323, 476, 722],
  ["Vandalism", 2300, 2180, 2211, 1681, 1068, 795, 800, 1018, 1575, 1578, 1636, 1485, 2127, 1671, 1780, 2055, 2420, 3038, 3704, 3655, 3603, 3544, 3639, 3315],
  ["Vehicle Theft", 1041, 1199, 946, 602, 441, 396, 514, 818, 1377, 1503, 1389, 1132, 1837, 1264, 1449, 1790, 2074, 2809, 3502, 3260, 3456, 3246, 3333, 2933]
];


var year_neighborhood_param = {
	"bindto": '#crime_slides',
  "data": {
    "rows": year_neighborhood,
    "type": "line",
    "selection": {
      "enabled": true
    }
  },
  "axis": {
    "x": {
      "type": "category",
      "categories": years
    }
  },
  "point": {
    "r": 5,
    "focus": {
      "expand": {
        "r": 7,
        "enabled": true
      }
    }
  },
  "grid": {
    "x": {
      "show": false
    },
    "y": {
      "show": true
    }
  },
  "tooltip": {
    "show": false,
    "grouped": false
  }
};


var crimetypes_neighborhood_param = {
	"bindto": '#crime_slides',
  "data": {
    "columns": crimetypes_neighborhood,
    "type": "donut",
    "selection": {
      "enabled": true
    }
  },
  "axis": {
    "x": {
      "type": "category",
      "categories": neighborhoods
    }
  }
};

var crimetype_dayofweek_param = {
	"bindto": '#crime_slides',
  "data": {
    "columns": crimetypes_dayofweek,
    "type": "line",
    "selection": {
      "enabled": true
    }
  },
  "axis": {
    "x": {
      "type": "category",
      "categories": days,
			"tick": {   
      	rotate: 45,
      	multiline: false
      }    
   	}
  }
};

var hours_neighborhood_param = {
	"bindto": '#crime_slides',
  "data": {
    "columns": hours_neighborhood,
    "type": "line",
    "selection": {
      "enabled": true
    }
  },
  "axis": {
    "x": {
      "type": "category",
      "categories": hours,
			"tick": {
      	rotate: 45,
      	multiline: false
      }    
   	}
  }
};

var hours_crimetype_param = {
	"bindto": '#crime_slides',
  "data": {
    "columns": hours_crimetype,
    "type": "line",
    "selection": {
      "enabled": true
    }
  },
  "axis": {
    "x": {
      "type": "category",
      "categories": hours,
			"tick": {
      	rotate: 45,
      	multiline: false
      }    
   	}
  }
};


//slides
//crime over time
var year_neighborhood_object = c3.generate(year_neighborhood_param);

var slide_0 = function() {
  document.getElementById("message").innerHTML = "We thought that crime in SF had probably fallen in the last few years. We investigated, and we were wrong.";
};

var slide_1 = function() {
  year_neighborhood_object.unload({
    "ids": ["INGLESIDE", "BAYVIEW", "PARK", "TARAVAL", "CENTRAL"]
  });

  document.getElementById("message").innerHTML = "This is a little too complicated. Let's narrow our focus to just a few SF neighborhoods. We can see a steady rise in crime in the Southern and Richmond districts along with a steady decline in the Tenderloin district.";
};

var slide_1 = function() {
	document.getElementById("start_btn").disabled = true;
  year_neighborhood_object.unload({
    "ids": ["INGLESIDE", "BAYVIEW", "PARK", "TARAVAL", "CENTRAL"]
	});
  document.getElementById("message").innerHTML = "This is a little too complicated. Let's narrow our focus to just a few SF neighborhoods.";

	setTimeout(function () {
  year_neighborhood_object.focus(["SOUTHERN", "TENDERLOIN", "RICHMOND"]);
  document.getElementById("message").innerHTML = "We can see a steady rise in crime in the Southern and Richmond districts along with a steady decline in the Tenderloin district.";
	document.getElementById("start_btn").disabled = false;
	}, 3000);

};

//type of crime by neighborhood
var slide_2 = function() {
	document.getElementById("start_btn").disabled = true;
  var crimetypes_neighborhood_object = c3.generate(crimetypes_neighborhood_param);
  
  //we have to do it this way because we can't access our chart object outside this function
  document.getElementById("message").innerHTML = "But 'crime rates' can mean a whole lot. What types of crime are happening?";
  
  setTimeout(function () {
    crimetypes_neighborhood_object.transform("bar");
  	document.getElementById("message").innerHTML = "...and now let's split it up by neighborhood";
	}, 10000);

  setTimeout(function () {
    crimetypes_neighborhood_object.focus("Theft");
  	document.getElementById("message").innerHTML = "Theft is just too high and we can't see what's going on with anything else. Let's remove it.";
	}, 15000);

  setTimeout(function () {
	  crimetypes_neighborhood_object.revert();
    crimetypes_neighborhood_object.unload({
    	"ids": "Theft"
    });
  	document.getElementById("message").innerHTML = "Much better.";

	}, 20000);

  setTimeout(function () {
    crimetypes_neighborhood_object.focus("Drugs");
    document.getElementById("message").innerHTML = "A closer look at a single category";
	}, 25000);

  setTimeout(function () {
    crimetypes_neighborhood_object.select(["Drugs"], [4]);
    document.getElementById("message").innerHTML = "What's going on in this district?";
	}, 28000);

  setTimeout(function () {
		document.getElementById("message").innerHTML = "Click around the data to explore more!";
		document.getElementById("start_btn").disabled = false;
	}, 30000);
  
};


//crime by day of week broken down by neighborhood
var slide_3 = function() {
  document.getElementById("start_btn").disabled = true;

  var crimetype_dayofweek_object = c3.generate(crimetype_dayofweek_param);
  document.getElementById("message").innerHTML = "Any variations in types of crime by day or week?";

  setTimeout(function () {
    crimetype_dayofweek_object.focus("Theft");
  	document.getElementById("message").innerHTML = "Again, let's remove the Theft. It's just too much.";
	}, 4000);

  setTimeout(function () {
	  crimetype_dayofweek_object.revert();
    crimetype_dayofweek_object.unload({
    	"ids": "Theft"
    });
  	document.getElementById("message").innerHTML = "Much better.";

	}, 7000);

  setTimeout(function () {
  	crimetype_dayofweek_object.xgrids([{value: 5}]);
    crimetype_dayofweek_object.focus(["Vandalism", "Vehicle Theft", "Burglaries", "Missing Person"]);
  	document.getElementById("message").innerHTML = "Pro tip #1: Friday night's the night for certain types of crime";
	}, 10000);

  setTimeout(function () {
    crimetype_dayofweek_object.xgrids([]);
    crimetype_dayofweek_object.focus("Assault");
  	document.getElementById("message").innerHTML = "Pro tip #2: Be extra wary of assault over the weekend";
	}, 15000);

  setTimeout(function () {
    crimetype_dayofweek_object.focus("Drugs");
  	document.getElementById("message").innerHTML = "(Questionable) Pro tip #3: Drug deals are more common mid-week.";
	}, 20000);

  setTimeout(function () {
		document.getElementById("message").innerHTML = "Click around the data to explore more!";
		document.getElementById("start_btn").disabled = false;
	}, 25000);


};

//crime by hour
var slide_4 = function() {
	document.getElementById("start_btn").disabled = true;
  
  var hours_neighborhood_object = c3.generate(hours_neighborhood_param);
  document.getElementById("message").innerHTML = "Any variations of crime by time of day?";

  setTimeout(function () {
 	  hours_neighborhood_object.regions.add([
    	{"start": 3, "end": 7 },
    	{"start": 16, "end": 20, "class": 'region_red'}
    ]);
    document.getElementById("message").innerHTML = "The peaks and lulls of crime";
	}, 5000);

	setTimeout(function () {
	  hours_neighborhood_object.regions.remove();
	  hours_neighborhood_object.regions.add([
    	{"start": 11, "end": 13, "class": 'region_blue'}
    ]);
    document.getElementById("message").innerHTML = "The classic lunch hour crime rush";
	}, 12000);
  
    setTimeout(function () {
		document.getElementById("message").innerHTML = "Click around the data to explore more!";
		document.getElementById("start_btn").disabled = false;
	}, 17000);

};

var slide_5 = function() {  
	document.getElementById("start_btn").disabled = true;
  var hours_crimetype_object = c3.generate(hours_crimetype_param);
  document.getElementById("message").innerHTML = "Any variations in type of crime by time of day?";

  setTimeout(function () {
	  hours_crimetype_object.regions.add([
    	{"start": 17, "end": 21}
    ]);
    hours_crimetype_object.focus("Theft");
  	document.getElementById("message").innerHTML = "Theft is most common around noms time";
	}, 5000);

  setTimeout(function () {
	  hours_crimetype_object.regions.remove();
    hours_crimetype_object.revert();
    hours_crimetype_object.unload({
    	"ids": "Theft"
    });
  	document.getElementById("message").innerHTML = "Now that we've looked at it, let's remove  Theft again so we can look at other things. Bye bye.";
	}, 10000);

  setTimeout(function () {
	  hours_crimetype_object.regions([
    	{"start": 0, "end": 2}
    ]);
    hours_crimetype_object.focus("Assault");
  	document.getElementById("message").innerHTML = "There is a sharp peak in assault in the late night hours";
	}, 15000);

  setTimeout(function () {
		document.getElementById("message").innerHTML = "Click around the data to explore more!";
		document.getElementById("start_btn").disabled = false;
	}, 20000);

};


var slides = [slide_0, slide_1, slide_2, slide_3, slide_4, slide_5];


// cycle through slides
var current_slide = 0;

var run = function() {
  slides[current_slide]();
  current_slide += 1;

  if (current_slide === 1) {
    document.getElementById("start_btn").innerHTML = "Start";
  } else if (current_slide === slides.length) {
    current_slide = 0;
    document.getElementById("start_btn").innerHTML = "Replay";
  } else {
    document.getElementById("start_btn").innerHTML = "Continue";
  }
};

// button event handler
document.getElementById('start_btn').addEventListener("click", run);

// init

run();
//slides.bindto: '#slideshow'

