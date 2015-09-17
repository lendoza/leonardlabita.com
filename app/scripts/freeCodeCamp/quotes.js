$(document).ready(function(){
	$(function(){
    	var $random = $("#random li");
    	$('.generator').click(function(){
        	var rand = Math.floor(Math.random() * $random.length);
        	$random.hide().eq(rand).show();
        	return false;
    	}).triggerHandler('click');
	});
});