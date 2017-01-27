$(document).ready(function() {
  $('form').on('input', function(){
    let totalChars = 140;
    let charsInBox = ($('.textarea-control').text().length);
    let counter = $('form').find('.counter');
    counter.text(totalChars - charsInBox);
    if (charsInBox > 140) {
      counter.css({'color': 'red'});
    } else {
      counter.css({'color': '#244751'});
    }
  });
});