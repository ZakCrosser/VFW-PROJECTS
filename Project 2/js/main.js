//Project 2
//VFW Term 1208
//Zachary Crosser

window.addEventListener("DOMContentLoaded", function(){
  
  function $(x){
    var element = document.getElementById(x);
    return element;
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
  
  var catagory = ["--Choose a Catagory--", "Food", "Credit Card", "Entertainment", "ATM Withdraw"];
  makeDropMenu();
  
  /* var displayLink = $('displayLink');
  displayLink.addeventListener("click", showData);
  var clearLink = $("clear");
  clearLink.addEventListener("click", clearData);
  var addTransaction = $(addTransaction);
  addTransaction.addEventListener("click", add);
  */
  
  
});