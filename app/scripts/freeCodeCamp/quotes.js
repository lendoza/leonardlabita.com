$(document).ready(function(){
	
    function randomQuote(){

        var quotesSrc = [

            {
                "quote": "Give even if you only have a little",
                "source": "Buddha",
                "img": "../images/freeCodeCamp/quotes/buddha.jpg"
            },
            {
                "quote": "I don't want to be at the mercy of my emotions. I want to use them, to enjoy them, and to dominate them.",
                "source": "The Picture of Dorian Gray, by Oscar Wilde",
                "img": "../images/freeCodeCamp/quotes/wilde.jpg"
            },
            {
                "quote": "When we are no longer able to change a situation, we are challenged to change ourselves.",
                "source": "Mans Search for Meaning, by Viktor Frankl",
                "img": "../images/freeCodeCamp/quotes/frankl.png"
            },
            {
                "quote": "Every man I meet is my superior in some way. In that, I learn of him.",
                "source": "Letters and Social Aims, by Ralph Waldo Emerson",
                "img": "../images/freeCodeCamp/quotes/emerson.jpg"
            },
            {
                "quote": "And now that you don't have to be perfect, you can be good.",
                "source": "East of Eden, by John Steinbeck",
                "img": "../images/freeCodeCamp/quotes/steinbeck.jpg"
            },
            {
                "quote": "You have power over your mind - not outside events. Realize this, and you will find strength.",
                "source": "Meditations, by Marcus Aurelius",
                "img": "../images/freeCodeCamp/quotes/aurelius.jpg"
            },
            {
                "quote": "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
                "source": "The Rebel, by Albert Camus",
                "img": "../images/freeCodeCamp/quotes/camus.jpg"
            },
            {
                "quote": "Any fool can criticize, complain, and condemn—and most fools do. But it takes character and self-control to be understanding and forgiving.",
                "source":"How To Win Friends and Influence People, by Dale Carnegie",
                "img": "../images/freeCodeCamp/quotes/carnegie.jpg"
            },
            {
                "quote": "Every adversity, every failure, every heartbreak, carries with it the seed of an equal or greater benefit.",
                "source": "Think and Grow Rich, by Napoleon Hill",
                "img": "../images/freeCodeCamp/quotes/hill.jpg"
            },
            {
                "quote": "I took a walk in the woods and came out taller than the trees",
                "source": "Walden, by Henry David Thoreau",
                "img": "../images/freeCodeCamp/quotes/thoreau.jpg"
            }

        ];

        var randomNum = Math.floor(Math.random() * (quotesSrc.length));
        var img = $('#img').attr("src", quotesSrc[randomNum].img);
        var randomQuote = $('#randomQuotes').html(quotesSrc[randomNum].quote)
        var source = $('#source').html(quotesSrc[randomNum].source);
    }

    // Load Initial Quote
    randomQuote();

    $('#generator').click(function(){
        $('#quote-container').fadeOut(1000, function(){
            randomQuote();
            $('#quote-container').fadeIn(1500);
        });
    });

	
});