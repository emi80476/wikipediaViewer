function getResult(pageList) {
  for (var i in pageList) {
    searchResult = "<div id='result'><a href='https://en.wikipedia.org/?curid=" + i + "', target='_blank'><h2>" + pageList[i].title + "</h2><h4>" + pageList[i].extract + "</h4></a></div>";
    $(".result-list").append(searchResult);
  }
}

function getSearchResult(searchStr) {
  var result = {};

  $.ajax({
      type: "GET",
      url: 'https://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        generator: 'search',
        exchars: 200,
        exlimit: 'max',
        exintro: 1,
        explaintext: 1,
        gsrsearch: searchStr,
        gsrnamespace: ''
      },
      success: function (data, textStatus, jqXHR) {

      	result = data.query.pages;

      	getResult(result);

      },
      error: function (errorMessage) {
        var message = 'There is somthing worng from ajax request.' + 'The error code is: ' + errorMessage + '.';
        console.log(message);
      }
  });
}

function openRandomPage(event){
	window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank')

}

$(document).ready(function() {

  $('#search-box').focus(function(){
    $(this).val('');
  });
  
  $('#search-icon').on('click', function() {
    $('.result-list').empty();
    var searchStr = $('#search-box').val();
    getSearchResult(searchStr);
  });

  $('#search-box').keyup(function(event) {
    if (event.keyCode === 13) {
      $('#search-icon').click();
    }
  });

  $('#random-article').on('click', openRandomPage);
});












