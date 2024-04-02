var tables = document.getElementsByClassName("table");
var userName = document.getElementById("userName");
var idNumber = document.getElementById("idNumber");

const searchParams = new URLSearchParams(window.location.search);

userName.innerHTML = `${searchParams.get('name')}`;
idNumber.innerHTML = `${searchParams.get('idNum')}`;

for(let i of searchParams.get("tables").split(",")){
    tables[i].style.backgroundColor = "green";
}