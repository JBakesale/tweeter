/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Escape function
$(document).ready(function () {

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
      <img
        src="${escape(data.user.avatars)}"
        alt="avatar">
      <div class="name">${escape(data.user.name)}</div>
      <div class="handle">${escape(data.user.handle)}</div>
    </div>
    
  <div class="text">${escape(data.content.text)}</div>

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
  return 
};
//Submission Form
$(".tweet__form").submit(function (event) {
  event.preventDefault();
  const $form = $(this);
    const text = $('.tweet__text').val().length
    if (!text) {
      $('.error-container').slideDown(400).css('display', 'flex')
      $('.error-message').text('yo no text')
      return 
    }
    if (text > 140) {
    $('.error-container').slideDown(400).css('display', 'flex')
      $('.error-message').text('dude way over')
      return 
    }

let data = $form.serialize();
$.ajax("/tweets", {
  method: "POST",
  data,
}).then(loadTweets);
  $('.tweet__text').val('')
  $('.count').text(140)
  $('.error-container').slideUp(400).css('display', 'none')

});

  // Show tweets on initial page load
  loadTweets();
});
