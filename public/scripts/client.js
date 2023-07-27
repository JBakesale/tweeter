/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Escape function
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create the tweet
const createTweetElement = function (data) {
  let $tweet = $(`
  <article class="tweet">
  <div class="tweet__top">
    <div class="user">
      <img
        scr="${escape(data.user.avatars)}"
        alt="">
      <p>${escape(data.user.name)}</p>
    </div>
    <h4>${escape(data.user.handle)}</h4>
  </div>
  <p>${escape(data.content.text)}</p>
  <div class="tweet-bottom">
    <div class="timeago">${timeago.format(data.created_at)}</div>
    <div class="icons">
      <i class="fa fa-heart"></i>
      <i class="fa fa-retweet"></i>
      <i class="fa-regular fa-flag"></i>
    </div>
  </div>
</article>
  `);
  return $tweet;
};

// Loop through the tweets and dynamically render
const renderTweets = (tweets) => {
  // Empty container to prevent duplicates
  const container = $(".tweets__container");
  container.empty();

  tweets.forEach(function (tweet) {
    let tweetElement = createTweetElement(tweet);
    container.prepend(tweetElement);
  });
};

const loadTweets = () => {
  $.get("/tweets").then((data) => {
    renderTweets(data);
  });
};

// Form validation
const submitTweet = function (data) {
  // Add tweet to database and .then load/render
  return $.ajax("/tweets", {
    method: "POST",
    data,
  }).then(loadTweets);
};

$(document).ready(function () {
  // Show tweets on initial page load
  loadTweets();
});
