(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({

    afterRequest: function () {
    $(this.target).empty();

    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));
    }
  },

  template: function (doc) {
  var snippet = '';
  //console.log("Create new Template");
  doc.tweetText = urlify(""+doc.tweetText);
  doc.tweetText = atify(""+doc.tweetText);
  doc.tweetText = hashtagify(""+doc.tweetText);
  formatDate(doc);

  snippet += '<div id="tweet_date">' + doc.createdAt+'</div>' + '<br>' + '<div id= "tweet_text">' + doc.tweetText + '</div>';
  var output = '<div id="tweet"><h2>' + '<a href="http://www.twitter.com/@' + doc.screenName + '" target="_blank">' + doc.screenName + '</a></h2><p>' + doc.tweetRetweetedCount + '</p><img src="images/retweet.svg" id="retweetIcon"/> <p>'+doc.favoritesCount+'</p> <img src="images/star.png" id="favIcon"/> <p>' + doc.followerCount + '</p><img src="images/follower.png" id="followerIcon"/>';
  output += '<p id="links_' + doc.id + '" class="links"></p>';
  output += '<p>' + snippet + '</p></div>';
  return output;
},


  init: function () {
 $(document).on('click', 'a.more', function () {
    var $this = $(this),
        span = $this.parent().find('span');

    if (span.is(':visible')) {
      span.hide();
      $this.tweetText('more');
    }
    else {
      span.show();
      $this.tweetText('less');
    }

    return false;
  });
}


});
})(jQuery);


function formatDate(doc){
  //Fri Sep 25 10:25:43 CEST 2015
  newDate = ("" + doc.createdAt).charAt(0) +
    ("" + doc.createdAt).charAt(1) +
    (""+doc.createdAt).charAt(2) + ', ' +
    (""+doc.createdAt).charAt(8) +
    (""+doc.createdAt).charAt(9) + '.' +
    (""+doc.createdAt).charAt(4) +
    (""+doc.createdAt).charAt(5) +
    (""+doc.createdAt).charAt(6) + ' '+
    (""+doc.createdAt).charAt(11) +
    (""+doc.createdAt).charAt(12) + ':' +
    (""+doc.createdAt).charAt(14) +
    (""+doc.createdAt).charAt(15) + ':' +
    (""+doc.createdAt).charAt(17) +
    (""+doc.createdAt).charAt(18);
  doc.createdAt = "" + newDate;
}

//Links to Websites, @Persons and #Hashtags
function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '" target="blank">' + url + '</a>';
  })
}

function atify(text){
  var atRegex = /(@[^\s]+)/g;
  return text.replace(atRegex, function(url) {
    urlCopy = url;
    createAtTag(url);
      return '<a href="http://www.twitter.com/' + urlCopy.replace(/:$/, "") + '" target="blank">' + url + '</a>';
  })
}

function hashtagify(text){
  var hashtagRegex = /(#[^\s]+)/g;
  return text.replace(hashtagRegex, function(url) {
    urlCopy = url;
    createHashtagTag(url);
      return '<a href="http://www.twitter.com/' + urlCopy.replace(/:$/, "") + '" target="blank">' + url + '</a>';
  })
}

function findHashtags(text){
  var hashtagRegex = /(#[^\s]+)/g;
  text.select(hashtagRegex, function(url){
    createHashtagTag(url);
  })
}
//Links END
