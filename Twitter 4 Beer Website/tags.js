function AddInput(string){
  //console.log("Click" + string);
  document.getElementById("query").value += string;
  localStorage["input"] = document.getElementById("query").value;
        //console.log(localStorage["input"]);
        Manager.store.addByValue('q', ""+localStorage["input"]);
        Manager.doRequest();
}

function createHashtagTag(string){
  //console.log("New Tag "+string);
  var ul = document.getElementById("hashtagSelection");
  var li = document.createElement("li");
  a = document.createElement('a');
  a.href = "#";
  a.innerHTML = string;
  string = " "+string;
  a.onclick = function () {
    //console.log("Click" + string);
    document.getElementById("query").value += string;
    localStorage["input"] = document.getElementById("query").value;
          //console.log(localStorage["input"]);
          Manager.store.addByValue('q', ""+localStorage["input"]);
          Manager.doRequest();
};
  li.appendChild(a);
  ul.appendChild(li);
}

function createAtTag(string){
  //console.log("New Tag "+string);

  var ul = document.getElementById("atSelection");
  var li = document.createElement("li");
  a = document.createElement('a');
  a.href = "#";
  a.innerHTML = string;
  string = " "+string;
  a.onclick = function () {
    //console.log("Click" + string);
    document.getElementById("query").value += string;
    localStorage["input"] = document.getElementById("query").value;
          //console.log(localStorage["input"]);
          Manager.store.addByValue('q', ""+localStorage["input"]);
          Manager.doRequest();
};
  li.appendChild(a);
  ul.appendChild(li);
}

function checkEmptySelection(){
  if(/*List is empty*/true) {
    createIsEmptyText(document.getElementById("hashtagSelection"));
  }
  if(/*List is empty*/true) {
    createIsEmptyText(document.getElementById("atSelection"));
  }
}

function createIsEmptyText(ul){
  console.log("IsEmptyText");
  var li = document.createElement('li');
  li.innerHTML = "keine Referenzen gefunden.";
  ul.appendChild(li);
}

function clearSections(){
  console.log("Clear All");
  $(hashtagSelection).empty();
  $(atSelection).empty();
}
