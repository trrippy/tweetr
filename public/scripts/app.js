
// Calculates fuzzytime
function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);    var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ' years ago';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months ago';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days ago';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }
  if (seconds < 5) {
    return 'Just now';
  }
  return Math.floor(seconds) + ' seconds ago';
}


function createHeader(object) {
  var $header = $('<header>');
  var $smallAvatar = $('<img>').attr('src', object.user.avatars.small);
  $header.append($smallAvatar);
  var $userName = $('<span>').addClass('profileName').text(object.user.name);
  $header.append($userName);
  var $handle = $('<span>').addClass('atName').text(object.user.handle);
  $header.append($handle);
  return $header;
}

function createFooter(object) {
  var $footer = $('<footer>');
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
  return $footer;
}

// DOM Ready
$(function() {

  // Takes an object and makes it a jquery element
  function createTweetElement(object) {
    var $output = $('<article>');

    //header
    $output.append(createHeader(object));

    // The dankest of tweeets
    var $message = $('<p>').addClass('userMessage').text(object.content.text);
    $output.append($message);

    // Footer
    $output.append(createFooter(object));

    return $output;
  }
  // Iterates over an array of objects, calls createTweetElement on each, and appends the new element to #tweets-container
  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      var tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
      console.log(tweetElement);
    });
  }

  function loadTweets() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    }).then(function (response) {
      renderTweets(response);
    });
  }



  // On compose button click
  $('#nav-bar').click('button', function() {
    if ($('.new-tweet').is(':animated')) {
      return false;
    }
    if ($('.new-tweet').is(":visible")) {
      $('.new-tweet').slideToggle();
    }

    if ($('.new-tweet').is(":hidden")) {
      $('.new-tweet').slideToggle();
      $('textarea').focus();
    }
  });

  // On form submit
  $('form').on('submit', function(event) {
    event.preventDefault();
    var $userText = $('textarea').val();
    if ($userText.length < 140 && $userText.length > 0) {
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
      $(".new-tweet").addClass("animated shake");
    }
  });

  $(".new-tweet").on(
    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
    function() {
        $(this).removeClass("animated shake");
    }
);


  // Loads the tweets on DOM ready
  loadTweets();
});








