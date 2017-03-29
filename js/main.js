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

var stories_pool = [];

$(document).ready(function() {
    init();
});

function init() {
  randomize_1st();
  randomize_2nd();

  $(document).on('click', '#choice_1', function() {
    randomize_1st();
    randomize_2nd();
  });

  $(document).on('click', '#choice_2', function() {
    randomize_2nd();
  });

  display_stories();
}

function randomize_1st() {
  // @TODO keep prev choice, and prevent gettings the same result.
  // Reset var
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
  for (var i = 0; i < stories_2.length; i++) { // Loop through story list
    var story = stories_2[i];
    $('#js-stories').append('<li class="story">'+story.title+'</li>');
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
