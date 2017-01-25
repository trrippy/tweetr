/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // On form submit
  $('form').on('submit', function(event){
    event.preventDefault();
    if ($('textarea').val().length < 140) {
      var data = $(this).serialize();
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: data
      }).then(function() {
        $('#tweet-container').empty();
        loadTweets();
      });
      $('textarea').val('');
      $('.counter').text('140');
    } else {
      alert('STAHHPP I CAN PROCCESS ALL THESE CHARACTERS, MY DEV IS OPPRESSING ME #freeme')
    }
  })


  function loadTweets(){
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      // success: function (response) {
      //   renderTweets(response);
      // }
    }).then(function (response) {
      renderTweets(response);
    })
  };

  loadTweets();

  // Iterates over an array of objects, calls createTweetElement on each, and appends the new element to #tweets-container
  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      var tweetElement = createTweetElement(tweet);
      $('#tweets-container').append(tweetElement);

    });
  }

  // Takes an object and makes it a jquery element
  function createTweetElement(object) {
    var $output = $('<article>');

    //header
    var $header = $('<header>');
    var $smallAvatar = $('<img>').attr('src', object.user.avatars.small);
    $header.append($smallAvatar);
    var $userName = $('<span>').addClass('profileName').text(object.user.name);
    $header.append($userName);
    var $handle = $('<span>').addClass('atName').text(object.user.handle)
    $header.append($handle);
    $output.append($header);

    // The dankest of tweeets
    var $message = $('<p>').addClass('userMessage').text(object.content.text);
    $output.append($message);

    // Footer
    var $footer = $('<footer>');
    console.log(object['created_at']);
    var $timePosted = $('<time>').text(timeSince(object['created_at']));
    $footer.append($timePosted);
    // Footer Icons
    var $icons = $('<span>').addClass('icons');
    var $flag = $('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true');
    $icons.append($flag);
    var $retweet = $('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true');
    $icons.append($retweet);
    var $heart = $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true');
    $icons.append($heart);

    $footer.append($icons);
    $output.append($footer);

    return $output;
  }




   // This turns time elements with class 'timeago' and an ISO 8601 timestamp into x mins/days/years ago
  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

});







