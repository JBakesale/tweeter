$(function () {
  const errorMessage = $(".error-message");

  const isTweetValid = function (form) {
    const text_element = $(".tweet__text", form);
    const text = text_element.val();
    if (!text) {
      errorMessage.text("No input detected").slideDown(400);
      return false;
    }
    if (text.length > 140) {
      errorMessage.text("Your tweet is too long!").slideDown(400);
      return false;
    }

    return true;
  };

  errorMessage.hide();

  // For submission
  $(".tweet__form").submit(function (event) {
    event.preventDefault();

    const $form = $(this);

    // Validate tweet
    if (!isTweetValid($form)) {
      return false;
    }
    let data = $form.serialize();

    submitTweet(data).then(() => {
      loadTweets();

      // Clear submission entry
      $form.trigger("reset");

      // If previous error, slide errorMessage offscreen
      if (errorMessage.is(":visible")) {
        errorMessage.slideUp(400);
      }
    });
  });
  console.log($(".tweet__form"));
});
