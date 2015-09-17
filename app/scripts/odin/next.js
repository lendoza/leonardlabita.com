$(document).ready(function(){
  
  $("#search").click(function(){
    $("#search-input").animate({
      width:"toggle"
    });
  });
});

var sticky = $('#stream').offset().top;
$(document).scroll(function() {
    var scroll = $(this).scrollTop();
    if (scroll > sticky) {
      $('#stream').addClass('sticky');
    }
    else {
        $('#stream').removeClass('sticky');
    }
});