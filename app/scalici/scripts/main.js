$(document).ready(function () {

//dropdown function for services in desktop view

    $('.services').click( function(event){
        event.stopPropagation();
        $('.services-dropdown').toggle();
    });

    $(document).click( function(){
        $('.services-dropdown').hide();
    });

    $('.services').click(function(){
        $('.greenhouse-dropdown').hide();
    });

//dropdown function for greenhouse in desktop view

    $('.greenhouse').click( function(event){
        event.stopPropagation();
        $('.greenhouse-dropdown').toggle();
    });

    $(document).click( function(){
        $('.greenhouse-dropdown').hide();
    });

    $('.greenhouse').click(function(){
        $('.services-dropdown').hide();
    });

//dropdown function for menu in mobile view

    $('.cell-main-nav').click( function(event){
        event.stopPropagation();
        $('.cell-main-list').toggle();
    });

    $(document).click( function(){
        $('.cell-main-list').hide();
    });

//dropdown function for services in mobile view

    $('.mobile-services-dropdown').hide();
    
    $('.mobile-services').click( function(event){
        event.stopPropagation();
        $('.mobile-services-dropdown').toggle();
    });

    $(document).click( function(){
        $('.mobile-services-dropdown').hide();
    });

    $('.mobile-services').click(function(){
        $('.mobile-greenhouse-dropdown').hide();
    });



//dropdown function for greenhouse in mobile view
    $('.mobile-greenhouse-dropdown').hide();

    $('.mobile-greenhouse').click( function(event){
        event.stopPropagation();
        $('.mobile-greenhouse-dropdown').toggle();
    });

    $(document).click( function(){
        $('.mobile-greenhouse-dropdown').hide();
    });

    $('.mobile-greenhouse').click(function(){
        $('.mobile-services-dropdown').hide();
    });

});




