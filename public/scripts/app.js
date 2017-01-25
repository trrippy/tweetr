/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": "2017-01-24T23:24:17Z"
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": "2017-01-24T09:24:17Z"
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
                  },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": "2017-01-24T10:24:17Z"
  }
];


$(document).ready(function() {

  // Iterates over an array of objects, calls createTweetElement on each, and appends the new element to #tweets-container
  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      var tweetElement = createTweetElement(tweet);
      $('#tweets-container').append(tweetElement);

    });
    console.log($('#tweets-container'));
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
    var $timePosted = $('<time>').addClass('timeago').attr('datetime', object['created_at']);
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

  renderTweets(data);

  $('form').on('submit', function(event){
    event.preventDefault();
    var test = $(this).serialize();
    console.log(test);
  })

   // This turns time elements with class 'timeago' and an ISO 8601 timestamp into x mins/days/years ago
  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });
});







