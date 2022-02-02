
function loadCryptoPriceHistory (cryptoName) {
    //console.log(cryptoName);
    const request = new XMLHttpRequest();
    request.open("get", url+"/api/currency/"+cryptoName+"/history", true);
    request.onload = () => {
        try {
            const json_data = JSON.parse(request.responseText);
            showChart(json_data); //json_data
            //console.log(json_data);
        } catch (e) {
            console.warn("Could not load price history!");
            console.warn(e);
        }
    };
    request.send();
};

function loadCoinDetails (cryptoName) {
    const request = new XMLHttpRequest();
    request.open("get", url+"/api/currency/"+cryptoName, true);
    request.onload = () => {
        try {
            const json_data = JSON.parse(request.responseText);
            //console.log(json_data);
            document.getElementById("name").innerHTML = json_data["data"]["name"] +" (" + json_data["data"]["symbol"] +")";
            document.getElementById("priceUsd+ChangePercent24Hr").innerHTML = "$"+String(Math.round(parseFloat(json_data["data"]["priceUsd"])* 100)/100)+" USD  " +String(Math.round(parseFloat(json_data["data"]["changePercent24Hr"])* 100)/100) +"%  (24h)";
            //document.getElementById("priceUsd").innerHTML = "$"+String(Math.round(parseFloat(json_data["data"]["priceUsd"])* 100)/100)+" USD"
            //document.getElementById("changePercent24Hr").innerHTML = String(Math.round(parseFloat(json_data["data"]["changePercent24Hr"])* 100)/100);
            document.getElementById("marketCapUsd").innerHTML = "$" + String(Math.round(parseFloat(json_data["data"]["marketCapUsd"])/10000000)/100) +" MLD";
            document.getElementById("volumeUsd24Hr").innerHTML = "$" +String(Math.round(parseFloat(json_data["data"]["volumeUsd24Hr"])/10000000)/100) +" MLD";
            document.getElementById("supply").innerHTML = String(Math.round(parseFloat(json_data["data"]["supply"])/10000)/100) +" MLN " + json_data["data"]["symbol"];
            if((json_data["data"]["maxSupply"]) == null){
                document.getElementById("maxSupply").innerHTML = "N/A"
            }
            else{
                document.getElementById("maxSupply").innerHTML = String(Math.round(parseFloat(json_data["data"]["maxSupply"])/10000)/100) +" MLN " + json_data["data"]["symbol"];
            }
        } catch (e) {
            console.warn("Could not load price history!");
            console.warn(e);
        }
    };
    request.send();
};

function showChart(json_data) {
    var dates = []
    for(var i=0; i<json_data.length; i++){
        dates.push((json_data[i]["time"]).substring(0,10));
    }
    var prices = []
    for(var i=0; i<json_data.length; i++){
        prices.push((parseFloat(json_data[i]["priceUsd"])));
    }
    
    let myChart = document.getElementById('myChart').getContext("2d");
    new Chart(myChart, {
      type:"line",
      data:{
          labels:dates,                     //['Boston', "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford"],
          datasets:[{
              label:"Price USD",
              data:prices,                       //[617594, 181045, 153060, 106519, 105162, 95072],
              backgroundColor:"#800000"
          }]
      },
      options:{}
    });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function transactionAccept(){
    const cryptoName = location.search.substring(1);
    if ((localStorage.getItem("access_token") === null)){
      alert("Musisz być zalogowany żeby dokonywać transakcji! ")
    }
    else{
      sellBuy = document.getElementById("sellBuy").value;
      amount = document.getElementById("amount").value;
      access_token = localStorage.getItem("access_token");
      if(sellBuy = "buy"){
        alert("Kupiono");
        buy();
      }
      else if(sellBuy = "sell")
      alert("Sprzedano");
    }
  };
  
//   function buy(){
//     const cryptoName = location.search.substring(1);
//     var settings = {
//         "url": url+"/api/transactions/buy?amount="+amount+"&cryptocurrency_id="+cryptoName,
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//           "Authorization": access_token
//         },
//       };
      
//       $.ajax(settings).done(function (response) {
//         console.log(response);
//       });  
//   }


window.addEventListener('DOMContentLoaded', (event) => {
    const cryptoName = location.search.substring(1);
    loadCryptoPriceHistory(cryptoName);
    loadCoinDetails(cryptoName);
    document.getElementById("name").innerHTML = cryptoName;

});