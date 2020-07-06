/*

*/

window.onload = function() {
    let dropdown = document.getElementById('inpus-dropdown');
    let display1 = document.getElementById('inpus-display-1');
    let display2 = document.getElementById('inpus-display-2');
    let back = document.getElementById('inpus-back');

    
    dropdown.onclick = function () {
        let return_value = false;
        let last_id = sessionStorage.getItem('InpusLastID');
        if (last_id == null) {
            last_id = 1;
        } else {
            last_id = Number(last_id);
        }
        let uri = "https://jsonplaceholder.typicode.com/users/" + last_id;
        fetch(uri).then(res=> {
            if (res.status != 404) {
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if(this.readyState == 4 && this.status == 200) {
                        displayFirst(JSON.parse(this.responseText), dropdown, back, display1);
                        sessionStorage.setItem('InpusLastID', String(data.length + 1));
                        data = JSON.stringify(data);
                        sessionStorage.setItem('InpusUserList', data);
                    }
                }
                xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
                xhttp.send();
            } else {
                displayFirst(JSON.parse(sessionStorage.getItem('InpusUserList')), dropdown, back, display1);
                   
            }
        });
    }

    back.onclick = ()=>navigateBack(dropdown, display1, display2, back); 

        
}



function fetch_user(i) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = displaySecond(JSON.parse(this.responseText));
        }
    }

    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users/" + i, true);
    xhttp.send();
}



function displayFirst(data, dropdown, back, display1) {
    display1.style.display = "grid";
    display1.style.gridTemplateColumns = "1fr 3fr 3fr";
    display1.innerHTML = "<div class='align-vertical-center inpus-head inpus-item-first'>ID</div><div class='inpus-head inpus-item-first'>Name</div><div class='inpus-head'>Username</div>";
    dropdown.style.display = "none";
    back.style.display = "block";

    for (let i = 0; i < data.length; i++) {
        display1.innerHTML += ("<div onclick='fetch_user(" + data[i].id + ")' class='align-vertical-center inpus-item inpus-item-first'>" + data[i].id + "</div><div onclick='fetch_user(" + data[i].id + ")' class='inpus-item inpus-item-first'>" + data[i].name + "</div><div onclick='fetch_user(" + data[i].id + ")'  class='inpus-item'>" + data[i].username + "</div>");
    }
}



function displaySecond(data) {
    let display1 = document.getElementById('inpus-display-1');
    let display2 = document.getElementById('inpus-display-2');

    display1.style.display = "none";
    display2.style.display = "grid";
    display2.style.gridTemplateColumns = "auto auto";

    display2.innerHTML = "<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Name: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.name + "</div>";
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Username: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.username + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Email: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.email + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Address: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.address.street + ", " + data.address.suite + ", " + data.address.city + " - " + data.address.zipcode + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Geo Location: </div>"+"<div class='inpus-display2-item inpus-display2-second'> Latitude: " + data.address.geo.lat + ", Longitude: " + data.address.geo.lng + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Phone: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.phone + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Website: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.website + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Company: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.company.name + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Catch Phrase: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.company.catchPhrase + "</div>");
    display2.innerHTML += ("<div class='inpus-display2-item inpus-display2-first align-vertical-center'>Business: </div>"+"<div class='inpus-display2-item inpus-display2-second'>" + data.company.bs + "</div>");
}



function navigateBack (dropdown, display1, display2, back) {
    console.log("Hi I am here");
    if (display1.style.display === "grid") {
        display1.style.display = "none";
        back.style.display = "none";
        dropdown.style.display = "block";
    } else if (display2.style.display === "grid") {
        display2.style.display = "none";
        display1.style.display = "grid";
    }
}