var font_size_base = 24;
var current_story_id;
var parameters = [
  "space",
  "time",
  "message",
  "medium",
  "recipient",
  "constraint",
];

var choices_pool = [];

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

  $(document).on('click', '#choice_2', function() { //#choice_2:not(.disabled)
    randomize_2nd();
    update_stories();
  });

  $(document).on('click', '#shuffle', function() {
    randomize_1st();
    randomize_2nd();
    update_stories();
  });

  // Keyboard controls
  $(document).keydown(function(e) {
    console.log(e.keyCode);
    if (e.keyCode == 37) { // left arrow = click on 1st choice
      $('#choice_1').trigger('click');
    }
    if (e.keyCode == 39) { //right arrow = click on 2nd choice
      $('#choice_2').trigger('click');
    }
    if (e.keyCode == 27) { //right arrow = click on 2nd choice
      $('.js-close-story').trigger('click');
    }
  });

  // Open story on click on story title.
  $(document).on('click', '.story', function() {
    var id = $(this).data('id');
    display_story(id);
  });

  // Close story on click on cross button.
  $(document).on('click', '.js-close-story', function() {
    $('#js-story-overlay').fadeOut().removeClass('expanded');
    $('html').removeClass('no-scroll');
  });

  $(document).on('click', '.js-next-story', function() {
    if (current_story_id < stories_2.length) {
      current_story_id++;
      display_story(current_story_id);
      $('.story__overlay').animate({
        scrollTop: 0
      }, 500);
    }
  });

  $(document).on('click', '.js-prev-story', function() {
    if (current_story_id > 0) {
      current_story_id--;
      display_story(current_story_id);
      $('.story__overlay').animate({
        scrollTop: 0
      }, 500);
    }
  });

  // Open about page on click on the interrogation mark.
  $(document).on('click', '.js-open-about', function() {
    $('#js-about-overlay').fadeIn();
    $('html').addClass('no-scroll');
  });

  $(document).on('click', '.js-close-about', function() {
    $('#js-about-overlay').fadeOut();
    $('html').removeClass('no-scroll');
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
  console.clear();
  // @TODO keep prev choice, and prevent gettings the same result.
  // Reset var
  if (!isEmpty(choice2.value)) {
    var prev_choice = choice2.value;
  }
  choice2 = [];

  // Build related stories pool
  stories_pool = [];
  for (var i = 0; i < stories_2.length; i++) { // Loop through story list
    var story = stories_2[i];
    var isValid = false;

    // If story contains 1st choice value
    for (var key in story) {
      if ( story.hasOwnProperty(key) && parameters.indexOf(key) >= 0 && !isEmpty(story[key]) ) {
        // if is array
        if (Array.isArray(story[key])) {
          // console.log('its an array');
          var array = story[key];
          // console.log(array);
          for (var y = 0; y < array.length; y++) {
            // console.log('array[y] : ', array[y]);
            if (array[y] == choice1.value) {
              isValid = true;
            }
          }
        } else {
          // console.log('its something else..');
          var string = story[key];
          if (string == choice1.value) {
            isValid = true;
          }
        }
      }
    }

    if (isValid) {
      stories_pool.push(i);
    }
  }

  console.log(stories_pool);

  // Pick random 2nd choice
  while ( !choice2.value ) {
    var randomStory = pickRandomValue(stories_pool);

    // build choice from picked story
    var temp_choices = [];
    makeChoicesPool(stories_2[randomStory], temp_choices);
    var temp_choice = pickRandomValue(temp_choices);

    if ( temp_choice[1] !== choice1.parameter ) {
      console.log(temp_choice);
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


var selected_stories;
function update_stories() {
  selected_stories = [];
  for (var i = 0; i < stories_pool.length; i++) {
    var story = stories_2[stories_pool[i]];
    console.log(story);
    var isValid = false;
    for (var key in story) { // if this story contains choice2.value
      if ( story.hasOwnProperty(key) && parameters.indexOf(key) >= 0 && !isEmpty(story[key]) ) {
        // if is array
        if (Array.isArray(story[key])) {
          var array = story[key];
          for (var y = 0; y < array.length; y++) {
            if (array[y] == choice2.value) {
              isValid = true;
            }
          }
        } else {
          var string = story[key];
          if (string == choice2.value) {
            isValid = true;
          }
        }
      }
    }
    if (isValid) {
      console.log('isValid, we push id :', stories_pool[i]);
      selected_stories.push(stories_pool[i]);
    }
  }

  // disable / enable 2nd choice
  if ( stories_pool.length === 1 ) {
    $('#choice_2').addClass('disabled');
  } else {
    $('#choice_2').removeClass('disabled');
  }

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


function display_stories() {
  for (var u = 0; u < stories_2.length; u++) { // Loop through story list
    var story = stories_2[u];
    var output = '';
    output += '<li class="story" data-id="'+story.id+'">';
    output +=   '<span class="story__title">';
    output +=     story.title;
    output +=   '</span>';
    output +=   '<div class="clearfix">';
    output +=     '<div class="story__url" href="'+story.url+'" title="'+story.source+'">';
    output +=       '<span>from </span>';
    output +=       story.source;
    output +=     '</div>';
    output +=     '<span class="story__keywords">';
    var keywords = story.keywords;
    if (!isEmpty(keywords)) {
      for (var i=0; i<keywords.length; i++) {
        var keyword = story.keywords[i];
      output +=       '<span>';
      output +=         keyword;
      output +=       '</span>';
      }
    }
    output +=     '</div>';
    output +=   '</span>';
    output += '</li>';
    $('#js-stories').append(output);
  }
}

function display_story(idStory) {
  current_story_id = idStory;
  var id = idStory;
  // Display story content
  var output = "";

  // title
  output += "<h2>";
  output += stories_2[id].title;
  output += "</h2>";
  // source
  output += '<div class="clearfix">';
  output += '<a class="story__url" href="'+stories_2[id].url+'" target="blank">';
  output += '<span>from </span>';
  output += stories_2[id].source;
  output += '</a>';
  // keywords
  output += '<span class="story__keywords">';
  var keywords = stories_2[id].keywords;
  if (!isEmpty(keywords)) {
    for (var i=0; i<keywords.length; i++) {
      var keyword = stories_2[id].keywords[i];
      output += '<span>';
      output += keyword;
      output += '</span>';
    }
  }
  output += '</span>';
  output += '</div>';
  // content
  output += '<div class="story__content">';
  output += stories_2[id].content;
  output += '</div>';

  if (stories_2[id].media == "article") {
    output += '<a href="'+stories_2[id].url+'" target="blank" class="btn-blue">Continue reading the article</a>';
  }

  if (stories_2[id].media == "video") {
    output += '<a href="'+stories_2[id].url+'" target="blank" class="btn-blue">Watch the story</a>';
  }

  if (stories_2[id].media == "definition") {
    output += '<a href="'+stories_2[id].url+'" target="blank" class="btn-blue">Read the definition</a>';
  }

  $('#js-story-overlay .content').empty().append(output).parent().addClass('expanded').fadeIn();
  $('html').addClass('no-scroll');
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