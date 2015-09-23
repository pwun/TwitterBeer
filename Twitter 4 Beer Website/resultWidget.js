(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({

    /*
    facetLinks: function (facet_field, facet_values) {
      var links = [];
      if (facet_values) {
        for (var i = 0, l = facet_values.length; i < l; i++) {
          links.push(
            $('<a href="#"></a>')
            .text(facet_values[i])
            //.click(this.facetHandler(facet_field, facet_values[i]))
          );
        }
      }
      return links;
    },
    */

    afterRequest: function () {
    $(this.target).empty();
    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));
      /*
      var items = [];
      items = items.concat(this.facetLinks('topics', doc.topics));
      console.log(items);
      items = items.concat(this.facetLinks('organisations', doc.organisations));
      console.log(items);
      items = items.concat(this.facetLinks('exchanges', doc.exchanges));
      console.log(items);
      var $links = $('#links_' + doc.id);
      $links.empty();
      for (var j = 0, m = items.length; j < m; j++) {
        $links.append($('<li></li>').append(items[j]));
      }
      */
    }
  },

  template: function (doc) {
  var snippet = '';
  if (doc.tweetText.length > 300) {
    snippet += doc.createdAt + ' ' + doc.tweetText.substring(0, 100);
    snippet += '<span style="display:none;">' + doc.tweetText.substring(100);
    snippet += '</span> <a href="#" class="more">more</a>';
  }
  else {
    snippet += doc.createdAt + ': ' + doc.tweetText;
 }

  var output = '<div id="tweet"><h2>' + doc.screenName  +'</h2><div id="tweet_followerCount">'+ doc.followerCount+'</div>';
 /* output += '<p id="links_' + doc.id + '" class="links"></p>';*/
  output += '<p>' + snippet + '</p><p>'+ doc.tweetRetweetedCount+'</p></div>';
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
