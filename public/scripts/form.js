$(function() {

  // For submission
  $('.tweet_form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const $input = $form.find('textarea');

    // Validate tweet
    if (!isTweetValid($input)) {
      return false;
    }

// Ajax request refactored

    let data = $form.serialize();

    $post('/tweets', data)
      .then(() => {
        loadTweets();
        $input.val("");
        $input.trigger('input');
      })

  })
})



// // Partial tweet valid func
// function isTweetValid(inputElement) {

// }