// var stories_map
// var stories
// var stories_2

var font_size_base = 24;
var parameters = [
  "space",
  "time",
  "message",
  "medium",
  "recipient",
  "constraint",
];

var choices_pool = [];
var choices_pool_2 = [];

var choice1 = {
  "idStory": "",
  "parameter": "",
  "value": "",
};

var choice2 = {
  "idStory": "",
  "parameter": "",
  "value": "",
};

var choice_2;

var stories_pool = [];

$(document).ready(function() {
    init();
});

function init() {
  randomize_1st();
  randomize_2nd();
  display_stories();
  update_stories();

  $(document).on('click', '#choice_1', function() {
    randomize_1st();
    randomize_2nd();
    update_stories();
  });

  $(document).on('click', '#choice_2:not(.disabled)', function() {
    randomize_2nd();
    update_stories();
  });

  $(document).on('click', '#shuffle', function() {
    randomize_1st();
    randomize_2nd();
    update_stories();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 37) { // left arrow = click on 1st choice
      $('#choice_1').trigger('click');
    }
    if (e.keyCode == 39) { //right arrow = click on 2nd choice
      $('#choice_2').trigger('click');
    }
  });

  // Hey curious being
  // What if you typed konami code instead ?
  $(window).one('devtoolschange', function(e) {
    if (e.detail.open) {
      setTimeout(function() {
        console.log('Hmmm, you there ?');
      }, 500);
      setTimeout(function() {
        console.log('I whish we could talk through this...');
      }, 3000);
      setTimeout(function() {
        console.log('What if you could right me back ?');
      }, 6000);
      setTimeout(function() {
        console.log('Can you read me ?');
      }, 20000);
      setTimeout(function() {
        console.log('I feel lonely :‘(');
      }, 40000);
    }
  });
}

function randomize_1st() {
  // @TODO keep prev choice, and prevent gettings the same result.
  // Reset var
  choices_pool = [];
  choice1 = [];

  // Loop through stories
  for (var i = 0; i < stories_2.length; i++) {
    var story = stories_2[i];

    // Build initial choices pool
    makeChoicesPool(story, choices_pool);
  }

  // Pick a random 1st choice
  var random1 = pickRandomValue(choices_pool);
  choice1.idStory   = random1[0];
  choice1.parameter = random1[1];
  choice1.value     = random1[2];

  // Append 1st choice
  $('#choice_1').html(choice1.value);
}

function randomize_2nd() {
  // @TODO keep prev choice, and prevent gettings the same result.
  // Reset var
  choice2 = [];

  // Build related stories pool
  stories_pool = [];
  for (var i = 0; i < stories_2.length; i++) { // Loop through story list
    var story = stories_2[i];
    var isValid = false;

    // If story contains 1st choice value
    for (var key in story) {
      if ( story.hasOwnProperty(key) && parameters.indexOf(key) >= 0 && !isEmpty(story[key]) && story[key].indexOf(choice1.value) >= 0 ) {
        isValid = true;
      }
    }

    if (isValid) {
      stories_pool.push(i);
    }
  }

  // Pick random 2nd choice
  while ( !choice2.value ) {
    var randomStory = pickRandomValue(stories_pool);

    // build choice from picked story
    var temp_choices = [];
    makeChoicesPool(stories_2[randomStory], temp_choices);
    var temp_choice = pickRandomValue(temp_choices);

    if ( temp_choice[1] != choice1.parameter ) {
      choice2.idStory   = temp_choice[0];
      choice2.parameter = temp_choice[1];
      choice2.value     = temp_choice[2];
    }
  }

  // Append 2nd choice
  $('#choice_2').html(choice2.value);
}

function makeChoicesPool(story, array) {
  // Loop through story keys
  for (var key in story) {
    if ( story.hasOwnProperty(key) && parameters.indexOf(key) >= 0 ) {
      // If key is a parameter
      concatChoices(story.id, key, story[key], array);
    }
  }
}

function display_stories() {
  for (var u = 0; u < stories_2.length; u++) { // Loop through story list
    var story = stories_2[u];
    var output = '';
    output += '<li class="story" data-id="'+story.id+'">';
    output +=   '<span class="story__title">';
    output +=     story.title;
    output +=   '</span>';
    output +=   '<a class="story__url" href="'+story.url+'" title="'+story.source+'">';
    output +=     '<span>from </span>';
    output +=     story.source;
    output +=   '</a>';
    output +=   '<span class="story__keywords">';
    var keywords = story.keywords;
    if (!isEmpty(keywords)) {
      for (var i=0; i<keywords.length; i++) {
        var keyword = story.keywords[i];
      output +=     '<span>';
      output +=       keyword;
      output +=     '</span>';
      }
    }
    output +=   '</span>';
    output += '</li>';
    $('#js-stories').append(output);
  }
}


var selected_stories;
function update_stories() {
  selected_stories = [];
  // console.log(choices_pool);
  for (var i = 0; i < choices_pool.length; i++) { // Loop through choices list
    if ( choices_pool[i][2] == choice2.value ) {  // if choice value = choice1.value
      var story = stories_2[choice1.idStory];
      var isValid = false;
      for (var key in story) { // if this story contains choice2.value
        if ( story.hasOwnProperty(key) && parameters.indexOf(key) >= 0 && !isEmpty(story[key]) && story[key].indexOf(choice1.value) >= 0 ) {
          isValid = true;
        }
      }
      if (isValid) {
        console.log('isValid');
        selected_stories.push(choices_pool[i][0]);
      }
    }
  }
  // disable / enable 2nd choice
  // if ( selected_stories.length == 1 ) {
  //   $('#choice_2').addClass('disabled');
  // } else {
  //   $('#choice_2').removeClass('disabled');
  // }

  // clean previous
  $('.clone').remove();
  $('.hidden').removeClass('hidden');

  // display new ones
  for (var i = 0; i < selected_stories.length; i++) {
    var idStory = selected_stories[i];
    var stories = $('#js-stories').find("[data-id='"+idStory+"']");
    stories.each(function() {
      var clone = $(this).clone().addClass('clone').prependTo('#js-stories');
      $(this).addClass('hidden');
    });
  }
}





/**
 * Helper functions
 */


// Return a random value from an array
function pickRandomValue(array) {
  return array[Math.floor(Math.random()*array.length)];
}

// Concat -array of strings or -string into a source array
function concatChoices(id, param, array, dest_array) {
  if (array.length && !isEmpty(array)) {
    if ( Array.isArray(array) ) { // If it's an array
      for (var i = 0; i < array.length; i++) {
        dest_array.push([id, param, array[i]]);
      }
    } else if ( isString(array) ) { // Else if it's a string
      dest_array.push([id, param, array]);
    }
  }
}

// Check if object is empty
function isEmpty(data) {
  return (!data || 0 === data.length);
}

// Check if object is a string
function isString(data) {
  return (typeof data === 'string' || data instanceof String);
}

// Script to detect devTool state
// https://github.com/sindresorhus/devtools-detect
(function(){'use strict';var devtools={open:false,orientation:null};var threshold=160;var emitEvent=function(state,orientation){window.dispatchEvent(new CustomEvent('devtoolschange',{detail:{open:state,orientation:orientation}}));};setInterval(function(){var widthThreshold=window.outerWidth- window.innerWidth>threshold;var heightThreshold=window.outerHeight- window.innerHeight>threshold;var orientation=widthThreshold?'vertical':'horizontal';if(!(heightThreshold&&widthThreshold)&&((window.Firebug&&window.Firebug.chrome&&window.Firebug.chrome.isInitialized)||widthThreshold||heightThreshold)){if(!devtools.open||devtools.orientation!==orientation){emitEvent(true,orientation);}
devtools.open=true;devtools.orientation=orientation;}else{if(devtools.open){emitEvent(false,null);}
devtools.open=false;devtools.orientation=null;}},500);if(typeof module!=='undefined'&&module.exports){module.exports=devtools;}else{window.devtools=devtools;}})();