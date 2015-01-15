;(function ( $, window, document, undefined ) {

  $.fn.rift = function () {

    return this.each(function () {
      
      // Vurribles
      var element = $(this),
          elemImg = element.find('img'),
          imgSrc  = elemImg.attr('src');
  
      // We be chainin'  
      element
        .prepend('<span class="top-span"></span>')
        .append('<span class="btm-span"></span>')
        .find('span.top-span')
        .css('background', 'url(' + imgSrc + ') no-repeat center top')
        .css('background-size', '100%')
        .parent()
        .find('span.btm-span')
        .css('background', 'url(' + imgSrc + ') no-repeat center bottom')
        .css('background-size', '100%');
    });
  };
})( jQuery, window, document );

$('.rift-1').rift();

$('.rift-2').rift();

$('.rift-3').rift();

$(document).ready(function(){
  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 850, 'swing', function () {
          window.location.hash = target;
      });
  });
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

