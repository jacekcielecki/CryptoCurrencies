

    const rankingsBody = document.querySelector("#rankings-table > tbody");
    
    function loadRankings () {
        const request = new XMLHttpRequest();
        request.open("get", url+"/api/ranking");
        request.onload = () => {
            try {
                const json_data = JSON.parse(request.responseText);
                populateRankings(json_data);
            } catch (e) {
                console.warn("Could not load rankings! :(");
                console.warn(e);
            }
        };
        request.send();
    };

    function populateRankings (json_data) {
        while (rankingsBody.firstChild) {
            rankingsBody.removeChild(rankingsBody.firstChild);
        }
        json_data.forEach((row) => {
            const tr = document.createElement("tr");
            for (cell in row){
                if(cell != 'role' && cell != 'updated_at'){
                    if(cell == 'created_at'){
                        row[cell] = (row[cell]).substring(0,10);
                    }
                    const td = document.createElement("td");
                    td.textContent = row[cell];
                    tr.appendChild(td);
                }
            }
        
            rankingsBody.appendChild(tr);
        });
    }
    
    window.addEventListener('DOMContentLoaded', (event) => {
        loadRankings();
    });