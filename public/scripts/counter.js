$(document).ready(function () {

  $(".tweet__form").on('input', onInput);


});

const onInput = function(event) {

  let $input = $(this);

  let len = $input.val().length;
  let charsLeft = 140 - len; // reassign to 140

  const $counter = $input.closest('form').find('.count');

  $counter.text(charsLeft);
  $counter.toggleClass('form--red', charsLeft < 0);
};