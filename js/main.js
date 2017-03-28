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

var stories_pool = []; // 1, 3, ..., 7
var stories_pool = []; // 1, 3, ..., 7

$(document).ready(function() {
    init();
});

function init() {
  // Loop through stories
  for (var i = 0; i < stories_2.length; i++) {
    var story = stories_2[i];

    // Build initial choices pool
    makeChoicesPool(story, choices_pool);
  }

  // Pick a random 1st choice
  choice1.value = pickRandomValue(choices_pool);

  // Pick a story containing it
  // looping through each stories that contain 1st choice
  for (var i = 0; i < stories_2.length; i++) {
    var story = stories_2[i];
    var temp_pool = [];

    makeChoicesPool(story, temp_pool);

    // If story contains 1st choice
    if ( temp_pool.indexOf(choice1.value) >= 0 ) {
      stories_pool.push(i); // Store index of story into stories pool
    }
  }

  choice1.idStory = pickRandomValue(stories_pool);

  // Loop through story keys
  var story_1 = stories_2[choice1.idStory];
  for (var key in story_1) {
    if ( story_1.hasOwnProperty(key) ) {
      // If key value contains choice
      if ( story_1[key].indexOf(choice1.value) >= 0 ) {
        choice1.parameter = key;
        console.log("choice1.parameter : ", choice1.parameter);
      }
    }
  }

  // reset var
  stories_pool = [];

  // Get parent parameter

  // Append 1st choice
  $('#js-container').append('<span id="choice_1" class="choice random">' + choice1.value + '</span>');


  // Build related stories pool
  // looping through each stories that contain 1st choice
  for (var i = 0; i < stories_2.length; i++) {
    var story = stories_2[i];
    var temp_pool = [];

    makeChoicesPool(story, temp_pool);

    // If story contains 1st choice
    if ( temp_pool.indexOf(choice1.value) >= 0 ) {
      stories_pool.push(i); // Store index of story into stories pool
    }
  }

  // Pick random 2nd choice
  while ( !choice2.value ) {
    var randomStory = pickRandomValue(stories_pool);
    console.log("randomStory for choice 2 : ", randomStory);
    // build choice from picked story
    var temp_choices = [];
    makeChoicesPool(stories_2[randomStory], temp_choices);
    var temp_choice = pickRandomValue(temp_choices);

    if ( temp_choice != choice1.value ) {
      choice2.value = temp_choice;
      console.log("choice2.value : ", choice2.value);
    }
  }

  // Append 2nd choice
  $('#js-container').append('<span id="choice_2" class="choice random">' + choice2.value + '</span>');
}

function makeChoicesPool(story, array) {
  // Loop through story keys
  for (var key in story) {
    if ( story.hasOwnProperty(key) ) {
      // If key is a parameter
      if ( parameters.indexOf(key) >= 0 ) {
        concatChoices(story[key], array);
      }
    }
  }
}

function getParentParameter(key, obj){
  return ;
} 





/**
 * Helper functions
 */


// Return a random value from an array
function pickRandomValue(array) {
  return array[Math.floor(Math.random()*array.length)];
}

// Concat -array of strings or -string into a source array
function concatChoices(key, array) {
  if (key.length && !isEmpty(key)) {
    if ( Array.isArray(key) ) { // If it's an array
      for (var i = 0; i < key.length; i++) {
        array.push(key[i]);
      }
    } else if ( isString(key) ) { // Else if it's a string
      array.push(key);
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


















function init2() {
  // Generate initial custom select
  $('#js-container').append('<span>' + 'How to communicate ' + '</span>');

  var t = makeSelect(stories_map);

  $('#js-container').append(t);

  // Open/close select on click
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
    $(this).addClass('select__option--selected').prependTo(select);

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
  // Create object options
  for (var key in obj) {
    t.append('<div class="select__option" data-value="' + key + '">' + key + '</div>');
    options_count++;
  }

  // Compute element height
  t.height(options_count * font_size_base);

  var output = $('<div class="select__wrapper"></div>').append(t);

  // Return builded custom select
  return output;
}
