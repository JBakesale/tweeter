$(document).ready(function () {
  $(".tweet__form").on("input", onInput);
});

const onInput = function (event) {
  const $counter = $("output", event.currentTarget);
  let $input = $("#" + $counter.attr("for"), event.currentTarget);

  let len = $input.val().length;
  let charsLeft = 140 - len;

  $counter.val(charsLeft);
  $counter.toggleClass("form--red", charsLeft < 0);
};
