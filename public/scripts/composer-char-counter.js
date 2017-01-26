$(document).ready(function() {
  $('textarea').on('input', function(){
    let totalChars = 140;
    let charsInBox = +$(this).val().length;
    let counter = $('.new-tweet').find('.counter');
    counter.text(totalChars - charsInBox);
    if (charsInBox > 140) {
      counter.css({'color': 'red'});
    } else {
      counter.css({'color': '#244751'});
    }
  });
});