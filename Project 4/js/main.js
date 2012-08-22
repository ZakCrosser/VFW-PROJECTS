//Project 3
//VFW Term 1208
//Zachary Crosser
window.addEventListener("DOMContentLoaded", function(){
  
  function $(x){
    var theElement = document.getElementById(x);
    return theElement;
  }
  
  var makeDropMenu = function(){
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
  
  var getRadioType = function(){
    var radios = document.forms[0].types;
    for(var i=0; i<radios.length; i++){
      if(radios[i].checked){
        typeValue = radios[i].value;
      }
    }
  }
  
  var getCheckBoxStatus = function(){
    if($('recurring').checked){
      checkBoxValue = $('recurring').value;
    }else{
      checkBoxValue = "No";
    }
  }
  
  var controls = function(n){
    switch(n){
      case "on":
        $('form').style.display = "none";
        $('clearData').style.display ="inline";
        $('showInfo').style.display ="none";
        $('addNew').style.display ="inline";
        break;
      case "off":
        $('form').style.display = "block";
        $('clearData').style.display ="inline";
        $('showInfo').style.display ="inline";
        $('addNew').style.display ="none";
        $("data").style.display ="none";
      default:
        return false;
    }
  }
  
  var storeTransaction = function(key){
    if(!key){
        var id          = Math.floor(Math.random()*100001);
    }else{
      id = key;
    }
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
    return item
  }
  
  var showData = function(){
    controls("on");
    if(localStorage.length === 0){
      alert("There is no data in Local Storage, static data function added!")
     autoFillData();
     showData();
    } else {
      var makeDiv = document.createElement("div");
      makeDiv.setAttribute("id", "data");
      var makeList = $('storedTransactions');
      makeList.innerHTML = "";
      makeDiv.appendChild(makeList);
      document.body.appendChild(makeDiv);
      $("data").style.display ="block"
      for(var i=0, len=localStorage.length; i<len; i++){
        var makeLi = document.createElement('li');
        var linksLi = document.createElement('li');
        makeList.appendChild(makeLi);
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        var makeSubList = document.createElement('ul');
        makeLi.appendChild(makeSubList);
        makeLi.setAttribute('class', 'transaction ' + obj.catagory[1]);
        for(var s in obj){
          var makeSubLi = document.createElement('li');
          makeSubList.appendChild(makeSubLi);
          var optSubText = obj[s][0]+" "+obj[s][1];
          makeSubLi.innerHTML = optSubText;
          makeSubList.appendChild(linksLi);
        }
        makeItemLinks(localStorage.key(i), linksLi);
      }
    }
  }
  
  var autoFillData = function (){
    for(var j in json){
      var id = Math.floor(Math.random()*100001);
      localStorage.setItem(id, JSON.stringify(json[j]));
    }  
  }
  
  var makeItemLinks = function(key, linksLi){
    var editLink = document.createElement('a');
    editLink.href = "#";
    editLink.key = key;
    var editText = "Edit Transaction";
    editLink.onclick = (function() {editItem(key);});
    editLink.innerHTML = editText;
    linksLi.appendChild(editLink);
    var breakTag = document.createElement('br');
    linksLi.appendChild(breakTag);
    var deleteLink = document.createElement('a');
    deleteLink.href = "#";
    var deleteText = "Delete Transaction";
    deleteLink.onclick = (function() {deleteItem(key);});
    deleteLink.innerHTML = deleteText;
    linksLi.appendChild(deleteLink);
  }  
  
  var editItem = function(key){
    var value = localStorage.getItem(key);
    var item = JSON.parse(value);
    var submit = $('submit');
    controls("off");
    $('date').value = item.date[1];
    var radios = document.forms[0].types;
    for(var i=0; i<radios.length; i++){
      if(radios[i].value == "Deposit" && item.transType[1] == "Deposit"){
        radios[i].setAttribute("checked", "checked");
      }else if(radios[i].value == "Withdraw" && item.transType[1] == "Withdraw"){
        radios[i].setAttribute("checked", "checked");
      }else if(radios[i].value == "Adjustment" && item.transType[1] == "Adjustment"){
        radios[i].setAttribute("checked", "checked");
      }else if(radios[i].value == "Transfer" && item.transType[1] == "Transfer"){
        radios[i].setAttribute("checked", "checked");
      }  
    }
    if(item.checkBox[1] == "Yes"){
      $('recurring').setAttribute("checked", "checked");
    }
    $('groups').value = item.catagory[1];
    $('amount').value = item.amount[1];
    $('slider').value = item.slider[1];
    $('notes').value = item.notes[1];
    
    submit.value = "Edit Transaction";
    submit.key = key;
    console.log('editItem');
    console.log(submit.key);
    submit.onclick = (function(evt) {validate(evt);});
  }
  
  var deleteItem = function(key){
    var ask = confirm("Are you sure you want to delete this Transaction?");
    if(ask){
      localStorage.removeItem(key);
      window.location.reload();
    }else{
      alert("Transaction was NOT deleted!")
    }
  }
  
  var clearData = function(){
    if(localStorage.length === 0){
      alert("There Are No Transactions Saved!")
    }else{
      localStorage.clear();
      alert("All Transactions Have Been Deleted!");
      window.location.reload();
      return false;
    }
  }
  
  var validate = function(evt){
    console.log($('submit').key);
    var getDate      =$('date');
    var getCatagory  =$('groups');
    var getAmount    =$('amount');
    var getNotes     =$('notes');
    
    errMsg.innerHTML = "";
    getCatagory.setAttribute("class", "");
    getDate.setAttribute("class", "");
    getAmount.setAttribute("class", "");
    getNotes.setAttribute("class", "");
    
  
    
    var messageAry = [];
    
    if(getCatagory.value === "--Choose a Catagory--"){
      var catagoryError = "Please Pick a Catagory";
      getCatagory.setAttribute("class", "errors");
      messageAry.push(catagoryError); 
    }
    if(getDate.value === ""){
      var dateError = "Please Enter A Date";
      getDate.setAttribute("class", "errors");
      messageAry.push(dateError);
    }
    if(!(new RegExp("^[0-9\.]+$", "i")).test(getAmount.value)){
      var amountError = "Please Enter A Amount";
      getAmount.setAttribute("class", "errors");
      messageAry.push(amountError);
    }
    if(getNotes.value === ""){
      var notesError = "Please Enter Notes";
      getNotes.setAttribute("class", "errors");
      messageAry.push(notesError);
    }
    if(messageAry.length >= 1){
      for(var i=0, j=messageAry.length; i < j; i++){
        var txt = document.createElement('li');
        txt.innerHTML = messageAry[i];
        errMsg.appendChild(txt);
      }
      evt.preventDefault();
      return false;
    }else{
      return storeTransaction($('submit').key);
    }
  }
 
 
    
  var catagory = ["--Choose a Catagory--", "Food", "Credit_Card", "Entertainment", "ATM_Withdraw"],
      typeValue,sss
      checkBoxValue = "No"
      errMsg = $('errors');
      ;
  makeDropMenu();

  document.getElementById('showInfo').onclick = (function(evt) {showData(evt);});
  document.getElementById('clearData').onclick = (function(evt) {clearData(evt);});
  document.getElementById('submit').onclick = (function(evt) {validate(evt);});
  
  
  
});