$(document).ready(function(){

  $('input, select, textarea').on('focus blur', function(event) {
    $('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type === 'blur' ? 10 : 1));
  });

  var Wiki = (function(){
 
    var wikiURL = 'https://en.wikipedia.org/wiki/';
    var toSearch = '';
    var articles = $('#articles');
    var input = $('input');

    function card(data) {
      var out = '<div class="card"><div class="card-content">';
      out += '<span class="card-title"><a href="' + wikiURL + data.title + '" target="_blank">' + data.title + '</a></span>';
      out += '<p>' + data.snippet + '</p>';
      out += '</div></div>';
      return out;
    }

    function search() {
      var searchStr = $('#search').val();
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        jsonp: "callback",
        dataType: 'jsonp',
        data: {
          action: "query",
          list: "search",
          srsearch: searchStr,
          format: "json",
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(response) {
          for (var i = 0; i < response.query.search.length; i++) {
            articles.append(card(response.query.search[i]));
          }
        }
      });
    }

    $('input').keypress(function(e) {
      if (e.which === 13) {
        $('#search-button').click();
      }
    });

    $('#search-button').on('click', function() {
      articles.empty();
      toSearch = input.val();
      search();
    });

  })();

});