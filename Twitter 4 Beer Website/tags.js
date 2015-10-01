function AddInput(string){
  document.getElementById("query").value += string;
  localStorage["input"] = document.getElementById("query").value;
        Manager.store.addByValue('q', ""+localStorage["input"]);
        Manager.doRequest();
}

function createHashtagTag(string){
  var ul = document.getElementById("hashtagSelection");
  var li = document.createElement("li");
  a = document.createElement('a');
  a.href = "#";
  a.innerHTML = string;
  string = " "+string;
  a.onclick = function () {
    document.getElementById("query").value += string;
    localStorage["input"] = document.getElementById("query").value;
          Manager.store.addByValue('q', ""+localStorage["input"]);
          Manager.doRequest();
};
  li.appendChild(a);
  ul.appendChild(li);
}

function createAtTag(string){
  var ul = document.getElementById("atSelection");
  var li = document.createElement("li");
  a = document.createElement('a');
  a.href = "#";
  a.innerHTML = string;
  string = " "+string;
  a.onclick = function () {
    document.getElementById("query").value += string;
    localStorage["input"] = document.getElementById("query").value;
          Manager.store.addByValue('q', ""+localStorage["input"]);
          Manager.doRequest();
};
  li.appendChild(a);
  ul.appendChild(li);
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
