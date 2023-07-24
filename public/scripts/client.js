/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  loadTweets();
});


const loadTweets = () => {

  // send ajax request
  $.get('/tweets')
  .then(data => {
    renderTweets(data);
  })
}


// Loop through the tweets and dynamically render each
const renderTweets = (tweets) => {
  const container = $('.tweets');
  container.empty();

  tweets.forEach(function(tweet) {
    let tweetElement = createTweetElement(tweet);
    container.append(tweetElement); //prepend
  })

};

// Create the tweet HTML
const createTweetElement = (tweetData) => {
  let $tweet = $('<article>').addClass('tweet');

  let html = `
    <header class="top"
      <div>
        <img class="tweet__avatar" src="${tweetData.user.avatar}">
        `
}