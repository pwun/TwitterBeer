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

     Manager.addWidget(new AjaxSolr.TextWidget({
         id:'text',
         target:'#search'

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


    Manager.init();
              console.log(""+localStorage["input"]);
              if(localStorage["input"]==undefined){
                localStorage["input"] = "";
              }
document.getElementById("query").value = localStorage["input"];
      console.log(localStorage["input"]);
      if(localStorage["input"]==""){
          Manager.store.addByValue('q', '*:*');
      }
      else{
          Manager.store.addByValue('q', ""+localStorage["input"]);
      }

      Manager.doRequest();

  });
})(jQuery);

function clearLS(){
  localStorage["input"] = "";
}
