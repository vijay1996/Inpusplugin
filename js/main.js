/*
    DEVELOPER REFERENCE
   *********************

    Breakdown of logic.
-------------------------------------------------------------------------------------------------------------------------------------------------------
    Click events (These are valid from start to the end of window lifecycle) -  

    1. dropdown.onclick - 
       a. As soon as the dropdown button is clicked, dropdownClicked() function is called to display table with user list.
    2. dropdownClicked also provides a click option. Each item displayed in the table are clickable divs and they have the 
       following click option - 
       a. onclick = fetchUser() - To display the details of the clicked user.
    3. back.onclick - Click event that calls navigateBack() to navigate to the previous screen.
    4. reloadButton.onclick - deletes local storage and reloads the page.
-------------------------------------------------------------------------------------------------------------------------------------------------------
    
    Functions

    1. dropdownClicked(dropdown, display1, back)
       a. Takes in three DOM parameters - dropdown, display1 and back.
       b. Checks if the id of next user is present in the local storage. If not, 1 is set as the next user_id.
       c. Request is made to the user api to fetch the user with next user id.
       d. If the request is successful, this means a new user has been added and the user list present in 
          the local storage has to be refreshed.
       e. If the request responds with 404, the list from local storage can be displayed, skipping the api 
          call to fetch all users.
       f. Caching method is used for this data because this step displays username, name of the user and user id. 
          This data hardly changes. But if it still changes, reload option is provided
       g. Using data from api call or from the local storage, displayFirst() function is called to display fetched data.
    2. displayFirst(data, dropdown, back, display1)
       a. this performs basic DOM operations to hide the dropdown button, display the next button and to write the data into 
          the widget's div tag.
    3. fetchUser(i) 
       a. This function fetches individual user data from the api and calls the displaySecond() function.
    4. displaySecond() - 
       a. This function displays the data fetched in the previous function.
    5. navigateBack() - 
       a. Performs dom operation to display the previous screen.
    6. reloadData() - 
       a. Clears local storage.
       b. reloads the page.
       c. this is to reflect any change in username, User ID or name of the user.
-------------------------------------------------------------------------------------------------------------------------------------------------------

*/

window.onload = function() {
    let dropdown = document.getElementById('inpus-dropdown');
    let display1 = document.getElementById('inpus-display-1');
    let display2 = document.getElementById('inpus-display-2');
    let back = document.getElementById('inpus-back');
    let reloadButton = document.getElementById('inpus-reload-list');
    
    dropdown.onclick = ()=>dropdownClicked(dropdown, display1, back);
    back.onclick = ()=>navigateBack(dropdown, display1, display2, back); 
    reloadButton.onclick = ()=>reloadData();
     
}



function dropdownClicked (dropdown, display1, back) {
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
                    displayFirst(data, dropdown, back, display1);
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




function displayFirst(data, dropdown, back, display1) {
    let reloadButton = document.getElementById('inpus-reload-list');

    reloadButton.style.display = "block";
    display1.style.display = "grid";
    display1.style.gridTemplateColumns = "1fr 3fr 3fr";
    display1.innerHTML = "<div class='align-vertical-center inpus-head inpus-item-first'>ID</div><div class='inpus-head inpus-item-first'>Name</div><div class='inpus-head'>Username</div>";
    dropdown.style.display = "none";
    back.style.display = "block";

    for (let i = 0; i < data.length; i++) {
        display1.innerHTML += ("<div onclick='fetchUser(" + data[i].id + ")' class='align-vertical-center inpus-item inpus-item-first'>" + data[i].id + "</div><div onclick='fetchUser(" + data[i].id + ")' class='inpus-item inpus-item-first'>" + data[i].name + "</div><div onclick='fetchUser(" + data[i].id + ")'  class='inpus-item'>" + data[i].username + "</div>");
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

    display1.style.display = "none";
    reloadButton.style.display = "none";
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
    let reloadButton = document.getElementById('inpus-reload-list');

    if (display1.style.display === "grid") {
        display1.style.display = "none";
        reloadButton.style.display = "none";
        back.style.display = "none";
        dropdown.style.display = "block";
    } else if (display2.style.display === "grid") {
        display2.style.display = "none";
        display1.style.display = "grid";
        reloadButton.style.display = "block";
    }
}


function reloadData() {
    sessionStorage.removeItem('InpusLastID');
    sessionStorage.removeItem('InpusUserList');
    location.reload();
}