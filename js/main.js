var stories_map = {

	"without" : {
		"speaking" : {
			"using ear and tongue sensors" : 1,
			"using brain-to-text technology" : 2,
			"using A.I to lipread" : 3
		},
		"being in the 21st century" : 1,
		"technology" : 2
	},

	"with" : {
		"a random stranger" : {
			"call this number to talk to a random Swede" : 1,
			"cement USB keys into the walls" : 2
		},
		"someone you know" : {
			"without knowing his address" : {
				"draw a map on the envelop" : 1
			},
			"without knowing how to reach him" : {
				"Use Facebook" : 1
			}
		}
	},

	"to another specie" : {
		"interspecie live-chat" : 1
	},

	"to a machine" : {
		"telling your problems to ELIZA" : 1
	},

	"about" : {
		"complex emtions" : {
			"without speaking" : {
				"using emojis" : 1,
				"using flowers" : 2
			}
		},
		"sensensitive informations" : 1
	},

	"under surveillance" : {
		"in a prison" : 1,
		"as an hostage" : 2
	},

	"against" : {
		"online racism" : {
			"using your own secret code" : 1,
			"trolling them IRL" : 2
		}
	},

	"beyond" : {
		"borders" : {
			"attaching USB sticks onto balloons" : 1,
			"using carrier pigeons" : 2,
			"building loudspeakers walls" : 3
		},
		"language and culture barriers" : {
			"learning communication patterns to avoid dramas" : 1,
			"using illustrations" : 2,
			"being prepared to face your counterpart" : 3
		}
	},

	"from" : {
		"the middle of the sea" : {
			"sending a message in a bottle" : 1,
			"using semaphore flags" : 2
		}
	}
}

var stories = [
	//0
	{	
		"url":"http://gizmodo.com/and-your-2015-word-of-the-year-is-the-face-with-tears-1742855716",
		"title":"2015 word of the year is the face with tears"
	},
	//1
	{	
		"url":"http://www.atlasobscura.com/articles/you-can-call-this-number-if-you-want-to-talk-to-a-random-swede?utm_source=twitter&utm_medium=atlas-page",
		"title":"You can call this number if you want to talk to a random swede"
	},
	//2
	{	
		"url":"http://www.bbc.com/news/blogs-trending-37233913",
		"title":"You can call this number if you want to talk to a random swede"
	},
	//3
	{	
		"url":"http://www.wired.co.uk/article/brain-to-text-tech-lets-computers-read-your-thoughts",
		"title":"You can call this number if you want to talk to a random swede"
	},
	//4
	{	
		"url":"https://www.wsj.com/articles/SB10001424127887323854904578638330635878760",
		"title":"You can call this number if you want to talk to a random swede"
	}
];

$(document).ready(function() {
  	init();
});

function init() {
	// Generate initial custom select
	$('#container').append('<span>' + 'How to communicate ' + '</span>');

	var t = makeSelect(stories_map);

	$('#container').append(t);

	$(document).on('click', '.select', function(e) {
		$(this).toggleClass('select--closed');
	});

	$(document).on('click', '.select:not(.select--closed) .select__option', function(e) {
		var select = $(this).parent();

		// Stop if clicked option is default
		if ($(this).hasClass('select__option--default')) {
			return;
		}

		// Select clicked option and put it as first child
		select.find('.select__option--selected').removeClass('select__option--selected');
		$(this).addClass('select__option--selected').prependTo($(this).parent());

		// Remove default option
		select.find('.select__option--default').remove();

		// Recompute select height since default option may have been removed
		select.height(select.find('.select__option').length * 20);
		updateSelect(select);
	});
}

function updateSelect(select) {
	var t = stories_map;
	select.parent().nextAll().remove();

	$('.select').each(function(key, s) {
		var selected = $(this).find('.select__option--selected').text();
		var s = $(this).html();
		
		t = t[selected];
		console.log(t);

		if (s == select.html()) {
			console.log('equal');
			if (jQuery.isPlainObject(t)) {
				var ss = makeSelect(t);
				$('#container').append(ss);
				return;
			} else {
				console.log(stories[t].url);
				$('#result').empty().append('<span>' + stories[t].title + '</span>');
				// $('#frame').attr('src', stories[t].url);
			}
		} else {
			console.log('n-equal');
		}
	});
}

function makeSelect(obj) {
	var t = $('<div class="select select--closed"></div>');

	// Create default option
	t.append('<div class="select__option select__option--default" data-value="" data-disabled="true" data-selected="true" disabled selected> </div>');
	var options_count = 1;
	// Create options
	for (var key in obj) {
		t.append('<div class="select__option" data-value="' + key + '">' + key + '</div>');
		options_count++;
	}

	// Compute height
	t.height(options_count * 20);

	var output = $('<div class="select__wrapper"></div>').append(t);

	// Return builded custom select
	return output;
}
