function AddInput(string){
  console.log("Click" + string);
  document.getElementById("query").value += string;
  localStorage["input"] = document.getElementById("query").value;
        console.log(localStorage["input"]);
        Manager.store.addByValue('q', ""+localStorage["input"]);
        Manager.doRequest();
}

function createTag(string){
  console.log("New Tag "+string);

  var ul = document.getElementById("hashtagSelection");
  var li = document.createElement("li");
  a = document.createElement('a');
  a.href = "#";
  a.innerHTML = string;
  //a.onclick = "javascript:AddInput(" + string + ")";
  a.onclick = function () {
    console.log("Click" + string);
    document.getElementById("query").value += string;
    localStorage["input"] = document.getElementById("query").value;
          console.log(localStorage["input"]);
          Manager.store.addByValue('q', ""+localStorage["input"]);
          Manager.doRequest();
};
  li.appendChild(a);
  ul.appendChild(li);
}
