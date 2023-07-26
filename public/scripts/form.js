$(function () {
  const errorContainer = $("section.error-container");
  errorContainer.on("reset", function () {
    errorContainer.slideUp(400).find("span").text("");
  });
  errorContainer.on("error", function (event, errorMessage) {
    // TODO: double check behaviour of on.error to see if i can reuse the on.reset
    errorContainer.slideUp(400).find("span").text("");
    errorContainer.find("span").text(errorMessage);
    errorContainer.slideDown();
  });

  const isTweetValid = function (form) {
    const text_element = $(".tweet__text", form);
    const text = text_element.val();
    if (!text) {
      errorContainer.trigger("error", "No input detected");
      return false;
    }
    if (text.length > 140) {
      errorContainer.trigger("error", "Your tweet is too long!");
      return false;
    }

    return true;
  };

  // For submission
  $(".tweet__form")
    .on("reset", function () {
      errorContainer.trigger("reset");
    })
    .submit(function (event) {
      event.preventDefault();

      const $form = $(this);
      // const $input = $form.find("textarea");

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
