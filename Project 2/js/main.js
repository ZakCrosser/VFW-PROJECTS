//Project 2
//VFW Term 1208
//Zachary Crosser

window.addEventListener("DOMContentLoaded", function(){
  
  function $(x){
    var element = document.getElementById(x);
    return element;
  }
  
  var displayLink = $('displayLink');
  displayLink.addeventListener("click", showData);
  var clearLink = $("clear");
  clearLink.addEventListener("click", clearData);
  var addTransaction = $(addTransaction);
  addTransaction.addEventListener("click", add);
  
  
  
});