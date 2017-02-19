var tree = {
	"short distance" : {
		"fast" : {
			"expensive" : {
				"big" : [
					{
						"title"   : "our first story",
						"content" : "we are very proud to say hello world",
						"date"    : "11-21-2016",
						"author"  : "thomas"
					},
					{
						"title"   : "our second story",
						"content" : "is it working ?",
						"date"    : "11-21-2017",
						"author"  : "thomas"
					}
				],
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			},
		},
		"average" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			},
		},
		"slow" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			}
		}
	},
	"medium distance" : {
		"fast" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			},
		},
		"average" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			},
		},
		"slow" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			}
		}
	},
	"high distance" : {
		"fast" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			},
		},
		"average" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			},
		},
		"slow" : {
			"expensive" : {
				"big" : {},
				"small" : {}
			},
			"cheap" : {
				"big" : {},
				"small" : {}
			}
		}
	}
};

// Base for unique IDs
var i = 0;
var selects = [];
var select_count = 0;

$(document).ready(function() {
	// Init the app.
	parseObject(tree);
	displaySelects(selects);
});

function parseObject(obj) {
	var keys = [];
	i++;
	keys.push({ "value": "default", "id": i });

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			var val = obj[key];
			// store option
			i++;
			keys.push({ "value": key, "id": i });
			$('#js-tree').append("<div>" + key + "</div>");
			if (!isArray(val)) { // If it's an array then there is some story(ies) inside.
				parseObject(val);
			} else {             // Else we need to parse deeper.
				displayStories(val);
			}
		}
	}
	makeSelect(keys);
}

// Return true if param is an array.
function isArray(a) {
    return (!!a) && (a.constructor === Array);
};

// Display stories inside provided array.
function displayStories(arr) {
	for (var story of arr) {
		var html = '';
			html += '<div class="story">';
			html += '<span class="story__key">title : </span>' + story.title + '<br>';
			html += '<span class="story__key">content : </span>' + story.content + '<br>';
			html += '<span class="story__key">date : </span>' + story.date + '<br>';
			html += '<span class="story__key">author : </span>' + story.author;
			html += '</div>';
		$('#js-tree').append(html);
	}
}

function makeSelect(data) {
	// console.log(data);

	var select = '';
	select += '<select>';
	for (var i=0; i < data.length; i++) {
		var option = data[i];
		select += '<option value="'+option.value+'" id="'+option.id+'">'+option.value+'</option>';
	} 
	select += '</select>';

	selects[select_count] = select;
	select_count++;
}

function displaySelects(data) {
	for (var i=0; i<data.length; i++) {
		$('#output').append(data[i]);
	}
};
