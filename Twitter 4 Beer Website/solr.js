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

function markActive(pos){
  switch (pos) {
    case 0:
      localStorage["sort"] = "";
      console.log("Mark deleted");
      break;
    case 1:
      localStorage["sort"] = "favoritesCount desc";
      console.log("Mark Fav Active");
      break;
    case 2:
      localStorage["sort"] = "tweetRetweetedCount desc";
      console.log("Mark Retweets Active");
      break;
    case 3:
      localStorage["sort"] = "createdAt desc";
      console.log("Mark Date Active");
      break;

    default:
      localStorage["sort"] = "";
      console.log("Mark Nothing");
  }
  Manager.doRequest();
}
