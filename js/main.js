/*
    DEVELOPER REFERENCE
   *********************
    
    Functions

    1. loadData(display1)
       a. Takes in three DOM parameters - display1.
       b. Checks if the id of next user is present in the local storage. If not, 1 is set as the next user_id.
       c. Request is made to the user api to fetch the user with next user id.
       d. If the request is successful, this means a new user has been added and the user list present in 
          the local storage has to be refreshed.
       e. If the request responds with 404, the list from local storage can be displayed, skipping the api 
          call to fetch all users.
       f. Caching method is used for this data because this step displays username, name of the user, user id, user email and phone number. 
          This data hardly changes. But if it still changes, reload option is provided
       g. Using data from api call or from the local storage, displayFirst() function is called to display fetched data.
    2. displayFirst(data, display1)
       a. Takes in data returned by load data and a DOM parameter - display1.
       b. This performs basic DOM operations display the user list by writing the data into 
          the page's div tag.
    3. fetchUser(i) 
       a. Takes in the ID of the clicked user.
       b. This function fetches individual user data from the api and calls the displaySecond() function.
    4. displaySecond(data) - 
       a. Takes in the data of the user returned by the fetchUser() function.
       a. This function displays the data fetched in the previous function.
    5. navigateBack() - 
       a. Performs dom operation to display the previous screen.
    6. reloadData() - 
       a. Clears local storage.
       b. Reloads the page.
       c. This is to reflect any change in username, User ID or name of the user.
    7. getMiniSuggestions(keyword) - 
       a. Takes in the keyword entered in the search box.
       b. Calls searchDataForKeyword() for obtaining array of users that have a match with the keyword.
       c. Displays the array of users as suggestions.
    8. searchDataForKeyword(data, keyword).
       a. Takes in user data and keyword from getMiniSuggestions().
       b. Checks if the keyword is present in any of the information item of the user.
       c. Returns all the matching users in an array of objects.
-------------------------------------------------------------------------------------------------------------------------------------------------------

*/

window.onload = function() {
    let display1 = document.getElementById('inpus-display-1');
    let display2 = document.getElementById('inpus-display-2');
    let back = document.getElementById('inpus-back');
    let reloadButton = document.getElementById('inpus-reload-list');
    let minisearch = document.getElementById('minisearch');

    loadData(display1, back);
    if (minisearch != null){
        setInterval(()=>{
            let prevKey = sessionStorage.getItem("InpusMiniKeyword");
            if (minisearch.value == '') {
                miniDiv = document.getElementById('miniSuggestions');
                miniDiv.innerHTML = "";
                display2.style.display = "none";
            }
            if (minisearch.value != prevKey && minisearch.value != '') {
                getMiniSuggestions(minisearch.value);
                sessionStorage.setItem("InpusMiniKeyword", minisearch.value);
            }
        }, 100);
    }
    
    if (back != null) {
        back.onclick = ()=>navigateBack(display1, display2, back); 
    }
    if (reloadButton != null) {
        reloadButton.onclick = ()=>reloadData();
    }
}



function loadData (display1) {
    let next_id = sessionStorage.getItem('InpusLastID');
    if (next_id == null) {
        next_id = 1;
    } else {
        next_id = Number(next_id);
    }
    let uri = "https://jsonplaceholder.typicode.com/users/" + next_id;
    fetch(uri).then(res=> {
        if (res.status != 404) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200) {
                    let data = JSON.parse(this.responseText);
                    displayFirst(data, display1);
                    sessionStorage.setItem('InpusLastID', String(data.length + 1));
                    data = JSON.stringify(data);
                    sessionStorage.setItem('InpusUserList', data);
                }
            }
            xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
            xhttp.send();
        } else {
            displayFirst(JSON.parse(sessionStorage.getItem('InpusUserList')), display1);
               
        }
    });
}




function displayFirst(data, display1) {
    let reloadButton = document.getElementById('inpus-reload-list');
    if (reloadButton != null) {
        reloadButton.style.display = "block";
    }
    if (display1 != null) {
        display1.style.display = "grid";
        display1.style.gridTemplateColumns = "1fr 3fr 3fr 3fr 3fr";
        display1.innerHTML = "<div class='align-vertical-center inpus-head inpus-item-first'>ID</div><div class='inpus-head inpus-item-first'>Name</div><div class='inpus-head'>Username</div><div class='inpus-head'>Email</div><div class='inpus-head'>Phone</div>";

        for (let i = 0; i < data.length; i++) {
            display1.innerHTML += ("<div onclick='fetchUser(" + data[i].id + ")' class='align-vertical-center inpus-item inpus-item-first'>" + data[i].id + "</div><div onclick='fetchUser(" + data[i].id + ")' class='inpus-item inpus-item-first'>" + data[i].name + "</div><div onclick='fetchUser(" + data[i].id + ")'  class='inpus-item inpus-item-first'>" + data[i].username + "</div><div onclick='fetchUser(" + data[i].id + ")'  class='inpus-item inpus-item-first'>" + data[i].email + "</div><div onclick='fetchUser(" + data[i].id + ")'  class='inpus-item inpus-item-first'>" + data[i].phone  + "</div>");
        }
    }
}



function fetchUser(i) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = displaySecond(JSON.parse(this.responseText));
        }
    }

    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users/" + i, true);
    xhttp.send();
}



function displaySecond(data) {
    let display1 = document.getElementById('inpus-display-1');
    let display2 = document.getElementById('inpus-display-2');
    let reloadButton = document.getElementById('inpus-reload-list');
    let back = document.getElementById('inpus-back');
    let miniSuggestions = document.getElementById('miniSuggestions');
    if (display1 != null) {
        display1.style.display = "none";
        reloadButton.style.display = "none";
        back.style.display = "block";
    } 
    if (display1 === null) {
        display2.style.width = "100%";
        miniSuggestions.innerHTML = "";
    }
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



function navigateBack (display1, display2, back) {
    let reloadButton = document.getElementById('inpus-reload-list');
    display2.style.display = "none";
    display1.style.display = "grid";
    back.style.display = "none";
    reloadButton.style.display = "block";
}


function reloadData() {
    sessionStorage.removeItem('InpusLastID');
    sessionStorage.removeItem('InpusUserList');
    location.reload();
}

function getMiniSuggestions(keyword) {
    let data = JSON.parse(sessionStorage.getItem('InpusUserList'));
    let suggestionArray = searchDataForKeyword(data,keyword);
    miniDiv = document.getElementById('miniSuggestions');
    miniDiv.innerHTML = '';
    for(let i = 0; i < 5; i ++) {
        if (suggestionArray[i] != null) {
            miniDiv.innerHTML += ('<div class="minisearchItem" onclick = fetchUser('+ suggestionArray[i].id +')>' + suggestionArray[i].value + '</div>');
        }
    }
}

function searchDataForKeyword(data,keyword) {
    let suggestionArray = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].name
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].username.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].username
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].email.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].email
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].address.street.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].address.street
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].address.suite.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].address.suite
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].address.city.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].address.city
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].address.zipcode.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].address.zipcode
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].phone.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].phone
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].website.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].website
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].company.name.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].company.name
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].company.catchPhrase.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].company.catchPhrase
            }
            suggestionArray.push(suggestionObject);
        }
        if (data[i].company.bs.toLowerCase().includes(keyword.toLowerCase())) {
            let suggestionObject = {
                "id": data[i].id,
                "value": data[i].company.bs
            }
            suggestionArray.push(suggestionObject);
        }
    }
    return suggestionArray;
}