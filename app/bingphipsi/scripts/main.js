$(document).ready(function(){
    $('.sub-menu').hide();
    $('.dropdown').click(function(){
        $(this).find('.sub-menu').slideToggle(500);
        return false;
    });
$('.sub-menu').click(function (event) {
    event.stopPropagation();
});

});


