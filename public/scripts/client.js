/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  loadTweets();
});

const loadTweets = () => {
  $.get("/tweets").then((data) => {
    renderTweets(data);
  });
};

// Loop through the tweets and dynamically render each
const renderTweets = (tweets) => {
  const container = $(".tweets");
  container.empty();

  tweets.forEach(function (tweet) {
    let tweetElement = createTweetElement(tweet);
    container.prepend(tweetElement); //prepend
  });
};

// Create the tweet HTML
const createTweetElement = (tweetData) => {
  let $tweet = $("<article>").addClass("tweet");

  let html = `
    <header class="top"
      <div>
        <img class="tweet__avatar" src="${tweetData.user.avatar}">
        `;
};

// Form validation
const submitTweet = function (event) {
  $(".error__message").slideUp(400).text("");

  if (!$(this).children().find("form__input").val()) {
    return $(".error__message").text("Please try again").slideDown();
  }
  // either form__input or tweet__form
  if ($(this).children().find("form__input").val().length > 140) {
    return $(".error__message").text("Your tweet is too long").slideDown();
  }

  // Add tweet to database and .then render
  $.ajax("/tweets", {
    method: "POST",
    data: $(this).serialize(),
  })
    .then(function (tweet) {
      loadTweets();
    })
    .catch((err) => {
      console.log("Error", err);
    });
  // Reset form count
  $(this).children().find("form__input").val("");
  $(".count").text(140);
};
