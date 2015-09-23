var Manager;
(function ($) {
	// short like in the tutorial: $(function()) 
	//but we stick with the long version
  $(document).ready(function(){
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://reuters-demo.tree.ewdev.ca:9090/reuters/'
      //This was the URL from the Solr server running on my Desktop 
      //solrUrl: 'http://evolvingweb.ca/solr/reuters/'
    });

   	Manager.addWidget(new AjaxSolr.ResultWidget({
      	id: 'result',
      	target: '#docs'
	   }));
	
    Manager.addWidget(new AjaxSolr.TextWidget({
        id: 'text',
        target: '#search'
    }));
  
    Manager.addWidget(new AjaxSolr.PagerWidget({
    id: 'pager',
    target:'#pager',
    prevLabel: '&lt' ,
    nexLabel: '&gt',
    innerWindow:1,
    renderHeader: function(perPage,offset,total){
    $('#pager-header').html($('<span></span>')
        .text('displaying ' + Math.min(total,offset+1)+' to '+
        Math.min(total,offset+perPage)+' of ' + total));
    }    
    }));  
    
      var fields = ['topics', 'organisations', 'exchanges'];
      for(var i=0,l=fields.length;i<1;i++){
          Manager.addWidget(new AjaxSolr.tagCloudWidget({
          id:fields[i],
          target: ' # ' + fields[i],
          field: fields[i]
                    
          }));     
      }
      
    Manager.init();
    //add Parameters to Store for normal query = q, *:*
    Manager.store.addByValue('q', '*:*');
    
    var params =  {
        facet:true,
        'facet.field':['topics','organisations','exchange'],
        'facet.limit':20,
        'facet.mincount':1,
        'f.topics.facet.limit':50,
        'json.nl':'map'    
    };
      
    for(var name in params){
        console.log(name);
        console.log(params[name]);
        Manager.store.addByValue(name, params[name])   
    }
      
      
    //if talking to solr works we see after using AbstractManager doRequest API
    Manager.doRequest();
  });
})(jQuery);
