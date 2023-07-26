/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// timeSinceTweet function here?

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
  <header>
    <div class="user">
      <img
        scr="${escape(data.user.avatars)}"
        alt="">
      <p>${escape(data.user.name)}</p>
    </div>
    <h4>${escape(data.user.handle)}</h4>
  </header>
  <p>${escape(data.content.text)}</p>
  <footer>
    <div class="timeago" datetime="2016-06-30 09:20:00"></div>
    <div class="icons">
      <i class="fa-regular fa-flag"></i>
      <
      <
    </div>
  </footer>
</article>
  `);
  return $tweet;
};

// Loop through the tweets and dynamically render each
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
const submitTweet = function (event) {
  // event.preventDefault();

  $(".error__message").slideUp(400).text("");

  if (!$(this).children().find(".tweet__form").val()) {
    return $(".error__message").text("Please try again").slideDown();
  }
  // either form__input or tweet__form
  if ($(this).children().find(".tweet__form").val().length > 140) {
    return $(".error__message").text("Your tweet is too long").slideDown();
  }

  // Add tweet to database and .then render
  $.ajax("/tweets", {
    method: "POST",
    data: $(this).serialize(),
  })
    .then(function (tweet) {
      loadTweets();

      // window.location.href = "/";
      // either redirect here or in loadTweets
    })
    .catch((err) => {
      console.log("Error", err);
    });
  // Reset form count
  $(this).children().find(".tweet__form").val("");
  $(".count").text(140);
};

// Show tweets on initial page load
loadTweets();

$(document).ready(function () {
  $(".tweet__form").on("submit", submitTweet);
});
