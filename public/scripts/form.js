$(function () {
  const errorMessage = $(".error-message");
  // errorMessage.on("reset", function () {
  //   errorMessage.slideUp(400);
  // });
  // errorMessage.on("error", function (event, errorMessage) {
  //   errorMessage.slideDown(400);
  // });

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
  $(".tweet__form")
    // .on("reset", function () {
      // errorMessage.trigger("reset");
    // })
    .submit(function (event) {
      event.preventDefault();

      const $form = $(this);

      // Validate tweet
      if (!isTweetValid($form)) {
        return false;
      }

      // Ajax request refactored

      let data = $form.serialize();

      submitTweet(data).then(() => {
        loadTweets();

        $form.trigger("reset");
      });
    });
  console.log($(".tweet__form"));
});
