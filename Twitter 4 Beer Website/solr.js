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
      Manager.store.get('sort').val(localStorage["sort"]);
      //console.log(selectSort());
      //Manager.store.get('sort').val('followerCount desc');
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
      console.log("Mark Nothing");
  }
  Manager.doRequest();
}

/*function markActive(pos){
  switch (pos) {
    case 1:
      $("#fav").addClass('active');
      if($("#retweets").hasClass('active')){
        $("#retweets").removeClass('active');
      }
      if($("#date").hasClass('active')){
        $("#date").removeClass('active');
      }
      console.log("Mark Fav Active");
      break;
      case 2:
        $("#retweets").addClass('active');
        if($("#fav").hasClass('active')){
          $("#fav").removeClass('active');
        }
        if($("#date").hasClass('active')){
          $("#date").removeClass('active');
        }
        console.log("Mark Retweets Active");
        break;
        case 3:
          $("#date").addClass('active');
          if($("#retweets").hasClass('active')){
            $("#retweets").removeClass('active');
          }
          if($("#fav").hasClass('active')){
            $("#fav").removeClass('active');
          }
          console.log("Mark Date Active");
          break;

    default:
      $("#fav").addClass('active');
      if($("#retweets").hasClass('active')){
        $("#retweets").removeClass('active');
      }
      if($("#retweets").hasClass('active')){
        $("#retweets").removeClass('active');
      }
      console.log("Mark Default Active");
  }
}*/

/*function selectSort(){
  var sort = '';
  var dropdown = document.getElementById("dropdown");
  sort = $('#dropdown').filter('.active').attr('id')+"";
  /*switch (sort) {
    case "Favorites":
      sort = "favoritesCount desc";
      break;
    case "Retweets":
      sort = "tweetRetweetedCount desc";
      break;
    case "Datum":
      sort = "createdAt desc";
      break;
    default:
    console.log("Default sort");
      sort = "favoritesCount desc";
  }
  console.log("Sort By: " + sort);
  return sort;
}*/
