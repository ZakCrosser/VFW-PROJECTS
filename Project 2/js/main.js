//Project 2
//VFW Term 1208
//Zachary Crosser
window.addEventListener("DOMContentLoaded", function(){
  
  function $(x){
    var theElement = document.getElementById(x);
    return theElement;
  }
  
  function makeDropMenu(){
    var formTag = document.getElementsByTagName("form"),
        selectLi = $('category'),
        makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "groups");
    for(var i=0, j=catagory.length; i<j; i++){
      var makeOption = document.createElement('option');
      var optText = catagory[i];
      makeOption.setAttribute("value", optText);
      makeOption.innerHTML = optText;
      makeSelect.appendChild(makeOption);
    }
    selectLi.appendChild(makeSelect);
  }
  
  function getRadioType(){
    var radios = document.forms[0].types;
    for(var i=0; i<radios.length; i++){
      if(radios[i].checked){
        typeValue = radios[i].value;
      }
    }
  }
  
  function getCheckBoxStatus(){
    if($('recurring').checked){
      checkBoxValue = $('recurring').value;
    }else{
      checkBoxValue = "No";
    }
  }
  
  function storeTransaction(){
    var id              = Math.floor(Math.random()*100001);
    getRadioType();
    getCheckBoxStatus();
    var item            = {};
        item.date       =["Date", $('date').value];
        item.transType  =["Type", typeValue];
        item.catagory   =["Catagory", $('groups').value];
        item.amount     =["Amount", $('amount').value];
        item.slider     =["Slider", $('slider').value];
        item.checkBox   =["Is it a reccuring transaction:", checkBoxValue];
        item.notes      =["Notes", $('notes').value];
    localStorage.setItem(id, JSON.stringify(item));
    alert("Transaction Saved!");
  }
  
  function showData(){
    var makeDiv = document.createElement("div");
    makeDiv.setAttribute("id", "data");
    var makeList = document.createElement('ul');
    makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    for(var i=0, len=localStorage.length; i<len; i++){
      var makeLi = document.createElement('li');
      makeList.appendChild(makeLi);
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var obj = JSON.parse(value);
      var makeSubList = document.createElement('ul');
      makeLi.appendChild(makeSubList);
      for(var n in obj){
        var makeSubLi = document.createElement('li');
        makeSubList.appendChild(makeSubLi);
        var optSubText = obj[n][0]+" "+obj[n][1];
        makeSubLi.innerHTML = optSubText;
      }
    }
  }
    
  var catagory = ["--Choose a Catagory--", "Food", "Credit Card", "Entertainment", "ATM Withdraw"],
      typeValue,sss
      checkBoxValue = "No"
      ;
  makeDropMenu();
  
  //var displayData = $('showInfo');
  //displayData.addEventListener("click", showData);
  document.getElementById('showInfo').onclick = (function(evt) {showData(evt);});
  //document.getElementById('clearData').onclick = (function(evt) {clearData(evt);});
  document.getElementById('submit').onclick = (function(evt) {storeTransaction(evt);});
  
  
  
});