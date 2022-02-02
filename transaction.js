
function hello(){
  if ((localStorage.getItem("access_token") === null)){
    alert("Musisz być zalogowany żeby dokonywać transakcji! ")
    window.location.href = "login.html";
  }
  else{
    sellBuy = document.getElementById("sellBuy").value;
    amount = document.getElementById("amount").value;
    access_token = localStorage.getItem("access_token");
  }
};


var settings = {
    "url": url+"/api/transactions/buy?amount="+amount+"&cryptocurrency_id="+cryptoName,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": access_token
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


  window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("buyButton").addEventListener("click", hello);
    //buyButton = document.getElementById("buyButton");
    let cryptoName = location.search.substring(1);
});