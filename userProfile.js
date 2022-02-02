
let personalChart = document.getElementById('personalChart').getContext("2d");
let cryptoChart = new Chart(personalChart, {
  type:"pie",
  data:{
      labels:['Bitcoin', "Ethereum", "Tether", "BNB", "USD Coin", "Cardano"],
      datasets:[{
          label:"Crypto",
          data:[617594, 181045, 153060, 106519, 105162, 95072],
          backgroundColor: ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#607D8B','#9E9E9E'],
      }]
  },
  options:{}
});

if (!(localStorage.getItem("access_token") === null)){ //jeżeli użytkownik jest zalogowany
  user_email = document.getElementById("user_email");
  user_email.innerText = localStorage.getItem("email");
  user_saldo.innerText = localStorage.getItem("saldo");
  user_name.innerText = localStorage.getItem("name");
  user_id.innerText = localStorage.getItem("id");
}
else{
  alert("Musisz być zalogowany aby uzyskać dostęp do swojego profilu!")
  window.location.href = "login.html";
}