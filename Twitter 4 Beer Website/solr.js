var Manager;
(function ($) {
  $(function () {
    Manager = new AjaxSolr.Manager({
      //solrUrl: 'http://evolvingweb.ca/solr/reuters/'
        solrUrl:'http://localhost:8983/solr/TwitterBeer/'
    });
      
      Manager.addWidget(new AjaxSolr.ResultWidget({
  id: 'result',
  target: '#docs'
}));
      
    Manager.init();
      
      Manager.store.addByValue('q', '*:*');
      
      Manager.doRequest();
  });
})(jQuery);