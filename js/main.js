var stories_map = {

	"without" : {
		"speaking" : {
			"using ear and tongue sensors" : 0,
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
			"without" : {
				"knowing his address" : {
					"draw a map on the envelop" : 1
				},
				"knowing how to reach him" : {
					"Use Facebook" : 1
				}
			},
		},
		"another specie" : {
			"interspecie live-chat" : 1
		},

		"a machine" : {
			"telling your problems to ELIZA" : 1
		}
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
		'title'   : 'Ear and tongue sensors combine to understand "silent speech"',
		'url'     : 'https://www.newscientist.com/article/dn28504-ear-and-tongue-sensors-combine-to-understand-silent-speech/',
		'date'    : '18 November 2015',
		'author'  : 'Aviva Rutkin',
		'content' : '<p>Read my lips. A new invention can recognise “silent speech” by keeping tabs on your tongue and ears.</p><p>By training it to recognise useful phrases, it could allow people who are disabled or work in loud environments to quietly control wearable devices.</p><p>The new device relies in part on a <a href="/article/dn24664-piercing-steers-wheelchairs-with-a-flick-of-the-tongue">magnetic tongue control system, </a>previously designed to help people with paralysis drive a power wheelchair via tongue movements.</p><p></p><p></p><p>But the researchers were concerned that the technology – which relies on a magnetic tongue piercing or a sensor affixed to the tongue – might be too invasive for some users.</p><p><a href="http://www.cc.gatech.edu/home/thad/">Thad Starner, </a>a professor at the Georgia Institute of Technology and technical lead on the wearable computer <a href="/article/mg21929364">Google Glass</a>, was inspired to try tracking ear movements after a dentist’s appointment. The dentist stuck a finger in Starner’s ear and asked him to bite down, a quick test for jaw function. As his jaw moved, so too did the space in his ears.</p><p>“I said, well, that’s cool. I wonder if we can do silent speech recognition with that?” says Starner.</p><h2>Infrared ear sensor</h2><p>The resulting device combines tongue control with earpieces that look somewhat like headphones. Each is embedded with a proximity sensor that uses infrared light to map the changing shape of ear canal. Different words require different jaw movements, deforming the canal in slightly different ways.</p><p>As a test, the team listed 12 phrases that might be required, such as “I need to use the bathroom” or “Give me my medicine, please”. People were then recorded repeating these while wearing the device.</p><p>With both the tongue and ear trackers in, the software recognised what the wearer was saying 90 per cent of the time. Using ear trackers alone, the accuracy was slightly lower (<i>IEEE Computer</i>, DOI: 10.1109/MC.2015.310).</p><h2>‘Jaw-emes’</h2><p>The researchers hope to build up a phrasebook of useful words and sentences recognisable just from the ear data. “We’re trying to figure out the fundamental parts of speech we can recognise. We call them ‘jaw-emes’,” says <a href="https://research.cc.gatech.edu/ccg/?q=user/abdelkareem-bedri">Abdelkareem Bedri</a>, a graduate student at Georgia Tech.</p><p>In addition, they’ve started looking into other potential uses for the ear data. One experiment with a modified version of the ear trackers reached 96 per cent accuracy in recognising simple jaw gestures, like a move from left to right. Such gestures could let the wearer discreetly control a wearable device. Heartbeat monitoring also seems feasible, and could help the system verify it is placed correctly in the wearer’s ear.</p><p><a href="https://www.neurones.espci.fr/denby/">Bruce Denby </a>works on silent speech in his lab at the Pierre and Marie Curie University in Paris. He says that demonstrating that the technology is “industry ready” will be key to bringing the technology to the market place.</p><p>“The true holy grail of silent speech is continuous speech recognition,” says Denby, but the ability to recognise even a limited set of phrases is already a tremendous boon for some disabled individuals, he adds.</p><p><i>(Image: Ryan McVay/Getty)</i></p>',
		'images'  : [
			'https://d1o50x50snmhul.cloudfront.net/wp-content/uploads/2015/11/dn28504-1_800.jpg'
		]
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

var font_size_base = 48;

$(document).ready(function() {
	setTimeout(function(){
		$('.js-intro').children().each(function(i) {
			var that = this;
			var content = $(this).data('content');
			setTimeout(function(){
				shuffleLetters(that, {
					text: content,
					step: 4, // How many times should the letters be changed
					fps: 15 // Frames Per Second
				});
			}, 500 * i);
		});
	}, 2000);

  	init();
});

function init() {
	// Generate initial custom select
	$('#js-container').append('<span>' + 'How to communicate ' + '</span>');

	var t = makeSelect(stories_map);

	$('#js-container').append(t);

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
		select.height(select.find('.select__option').length * font_size_base);
		updateSelect(select);
	});
}

function updateSelect(select) {
	var t = stories_map;
	select.parent().nextAll().remove();
	$('#js-story').empty();

	$('.select').each(function(key, s) {
		var selected = $(this).find('.select__option--selected').text();
		var s = $(this).html();
		
		t = t[selected];
		console.log(t);

		if (s == select.html()) {
			console.log('equal');
			if (jQuery.isPlainObject(t)) {
				var ss = makeSelect(t);
				$('#js-container').append(ss);
				return;
			} else {
				console.log(stories[t].url);
				var scrapped_story = '';
				if (stories[t].title) {
					scrapped_story += '<h1 class="story__title">' + stories[t].title + '</h1>';
				}
				if (stories[t].date) {
					scrapped_story += '<small class="story__date">' + stories[t].date + '</small>';
				}
				if (stories[t].author) {
					scrapped_story += '<small class="story__author">' + stories[t].author + '</small>';
				}
				if (stories[t].content) {
					scrapped_story += '<div class="story__content">' + stories[t].content + '</div>';
				}
				console.log('scrapped_story : ', scrapped_story);

				$('#js-story').empty().append(scrapped_story);

				// $('#js-story').children().each(function() {
				// 	var content = $(this).data('content');
				// 	shuffleLetters(this, {
				// 		text: content,
				// 		step: 1, // How many times should the letters be changed
				// 		fps: 15 // Frames Per Second
				// 	});
				// });
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
	t.height(options_count * font_size_base);

	var output = $('<div class="select__wrapper"></div>').append(t);

	// Return builded custom select
	return output;
}
