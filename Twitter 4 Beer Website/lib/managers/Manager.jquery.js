(function (callback) {
  if (typeof define === 'function' && define.amd) {
    define(['core/AbstractManager'], callback);
  }
  else {
    callback();
  }
}(function () {

/**
 * @see http://wiki.apache.org/solr/SolJSON#JSON_specific_parameters
 * @class Manager
 * @augments AjaxSolr.AbstractManager
 */
AjaxSolr.Manager = AjaxSolr.AbstractManager.extend(
  /** @lends AjaxSolr.Manager.prototype */
  {
  executeRequest: function (servlet, string, handler, errorHandler) {
    clearSections();
    var self = this,
        options = {dataType: 'json'/*, sort: 'tweetRetweetedCount desc'*/};
        //options.sort = "tweetRetweetedCount desc";
    string = string || this.store.string();

    /*
    string += "&sort=tweetRetweetedCount desc";
http://localhost:8983/solr/TwitterBeer/select?q=*%3A*&sort=tweetRetweetedCount%20desc&wt=json&json.wrf=jQuery172002101860917173326_1443449392548&_=1443449392641
    */
    console.log(string);
    handler = handler || function (data) {
      self.handleResponse(data);
    };
    errorHandler = errorHandler || function (jqXHR, textStatus, errorThrown) {
      self.handleError(textStatus + ', ' + errorThrown);
    };
    if (this.proxyUrl) {
      options.url = this.proxyUrl;
      options.data = {query: string};
      options.type = 'POST';
      //options.sort = "tweetRetweetedCount desc";
    }
    else {
      options.url = this.solrUrl + /*'sort="tweetRetweetedCount desc&"' +*/ servlet + '?' + string + '&wt=json&json.wrf=?';
      //options.sort = "tweetRetweetedCount desc";
      //?q=*&sort=map(category,20,20,case,0),score desc
    }
    jQuery.ajax(options).done(handler).fail(errorHandler);
  }
});

}));
