$(document).ready(function(){
	createGrid(16);
	clear();
	normal();
	colors();
	gradient();
});

//Create a grid  in the sketchpad div//
function createGrid(x){
	var squareSize = (500/x);

	for(var i = 0; i < (x*x); i++) {
		$('#sketchpad').prepend('<div class="square"></div>');
	}

	$(".square").width(squareSize);
	$(".square").height(squareSize);

	sketch();
}

//Allows white to appear when mouseover occurs//
function sketch(){
	$(".square").mouseover(function(){
		$(this).css("background-color", "white");
	});
}

function normal() {
	$("#default").click(function(){
		$(".square").remove();
		var newSize = $("input[name=size]").val();
		createGrid(newSize);
	});
}

//Changes white to color for mouseover//
function colors() {
	$("#colors").click(function(){
		$(".square").unbind();
		$(".square").css("background-color", "black");
		$(".square").css("opacity", 1);
		$('.square').remove();
		var newSize = $("input[name=size]").val();
		createGrid(newSize);
		$(".square").mouseover(function(){
			$(this).css("background-color", getRandomColor());
		});
	});
}

//Generates a random color to be used in color function//
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Clears the sketchpad//
function clear() {
	$("#clear").click(function(){
		$(".square").unbind();
		$(".square").css("background-color", "black");
		$(".square").css("opacity", 1);
		sketch();
	});
}