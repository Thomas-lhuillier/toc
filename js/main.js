var stories_map = {
	"communicate":{
 		"a complex emotion":{
 			"without":{
 				"words":0
 			}
 		},
 		"with a gorilla / with another specie":{
 			"using":{
 				"internet":3
 			}
 		},
 		"with a stranger":{
 			"without":{
 				"a network access":1
 			},
 			"in Sweden":{
 				"using":{
 					"a phone":2
 				}
 			},
 		}	
 	},
 	"send a message":{
 		"to a friend":{
 			"without":{
 				"knowing their address":1
 			}
 		},
 		"to a celebrity":{
 			"without":{
 				"knowing their address":2
 			}
 		}
 	},
 	"speak":{
 		"silently":{
 			"without":{
 				"knowing how to read lips":3
 			}
 		}
 	},
 	"access":{
 		"a radio":{
 			"using scrap materials":4
 		},
 		"a TV":{
 			"using scrap materials":4
 		},
 		"WI-FI network":{
 			"using scrap materials":4
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
	select.nextAll().remove();

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
				$('#result').append('<span>' + stories[t].title + '</span>');
				$('#frame').attr('src', stories[t].url);
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

	return t;
}
