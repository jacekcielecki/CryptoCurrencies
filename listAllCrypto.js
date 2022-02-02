

    const rankingsBody = document.querySelector("#rankings-table > tbody");
    
    function loadRankings () {
        const request = new XMLHttpRequest();

        request.open("get", url+"/api/currency/");
        request.onload = () => {
            try {
                const json_data = JSON.parse(request.responseText);
                const json = json_data.data;
                //console.log(json);
                populateRankings(json);
            } catch (e) {
                console.warn("Could not load rankings! :(");
                console.warn(e);
            }
        };
        request.send();
    };

    function populateRankings (json) {
        //czyści pola w tabeli
        while (rankingsBody.firstChild) {
            rankingsBody.removeChild(rankingsBody.firstChild);
        }
        //dodaje doane do tabeli
        json.forEach((row) => {
            const tr = document.createElement("tr");
            if(row['rank'] <= 30){
            //console.log(row);
            for (cell in row){
                //console.log(row['id']);
                //console.log(cell);
                if(cell=='id'){var name = row['id']}
                if(cell != 'explorer' && cell != 'id' && cell != 'maxSupply' && cell != 'supply' && cell != 'vwap24Hr'){
                    const td = document.createElement("td");
                    td.onclick = function() {location.href = "details.html?"+name+""};
                    if(isNaN(parseFloat(row[cell]))){ //jeżeli tekst
                        td.textContent = row[cell];
                    }
                    else{
                        var num = parseFloat(row[cell]); //jeżeli liczba
                        if(cell =="changePercent24Hr"){td.textContent = String(Math.round((num + Number.EPSILON) * 100) / 100)+"%"}
                        else if(cell =="priceUsd"){td.textContent = "$"+String(Math.round((num + Number.EPSILON) * 100) / 100)}
                        else if(cell =="marketCapUsd"){td.textContent=("$" + String(Math.round((row[cell])/10000000))/100)+" MLD"}
                        else if(cell =="volumeUsd24Hr"){td.textContent=("$" + String(Math.round((row[cell])/10000000))/100)+" MLD"}
                        else if(cell =="rank"){td.textContent=(row[cell])+"."}
                    }
                //td.textContent = row[cell];
                tr.appendChild(td);
                
                }
            }
        };
            rankingsBody.appendChild(tr);
        });
    }

    //wywołaj funkcje po załadowaniu strony
    window.addEventListener('DOMContentLoaded', (event) => {
        loadRankings();
    });
    //console.log(json);