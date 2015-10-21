$(document).ready(function(){
  
  $("#search").click(function(){
    $("#search-input").animate({
      width:"toggle"
    });
  });

  $(document).scroll(function() {
      var sticky = $('#stream').offset().top;
      var scroll = $(this).scrollTop();
      if (scroll > sticky) {
        $('#stream').addClass('sticky');
      }
      else {
          $('#stream').removeClass('sticky');
      }
  });

});