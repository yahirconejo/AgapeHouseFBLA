// nav

function navHoverOn(newTab){
                
    var navButtons = document.getElementById("navButtons");
    var newTabWidth = (newTab.offsetWidth - 10) / navButtons.offsetWidth;
    navButtons.style.setProperty("--_opaTrans", 200 + "ms")
    
    navButtons.style.setProperty("--_opa", 1);
    navButtons.style.setProperty("--_width", newTabWidth);
    navButtons.style.setProperty("--_left", newTab.offsetLeft + 5 + "px");
    
}

function navHoverOff(){
    var navButtons = document.getElementById("navButtons");
    navButtons.style.setProperty("--_opa", 0);
    navButtons.style.setProperty("--_opaTrans", 600 + "ms")
}


var burgerNav = document.getElementById("burgerNav");
var burgerOverlay = document.getElementById("burgerOverlay");
var burgerOverlayA = document.querySelectorAll("#burgerOverlay a");
var burgerOverlayDiv = document.querySelectorAll("#burgerOverlay div");
var burgerNavOpen = false;

function burgerNavClick(){
     if(burgerNavOpen){
        burgerNav.classList.remove("BNopen");
        burgerOverlay.style.maxHeight = "0px";
        burgerOverlay.style.borderTop = "none";
        for(var i =0; i < burgerOverlayA.length; i++){
            burgerOverlayA[i].style.pointerEvents = "none";
            burgerOverlayDiv[i].style.opacity = "0";
        }
        burgerNavOpen = false;
    }else if(!burgerNavOpen){
        burgerNav.classList.add("BNopen");
        burgerOverlay.style.maxHeight = "1000px";
        burgerOverlay.style.borderTop = "2px solid gray";
        for(var i =0; i < burgerOverlayA.length; i++){
            burgerOverlayA[i].style.pointerEvents = "auto";
            burgerOverlayDiv[i].style.opacity = "1";
        }

        burgerNavOpen = true;
    }
}

burgerNav.addEventListener("click", burgerNavClick);

window.onresize = function(){
    if(window.innerWidth >= 650 && burgerNavOpen == true){
        console.log("less");
        burgerNavClick();
    }
}


// section 1 ----------------------------------------------------------------

var sect1Darkner = document.getElementById("darkenerSect1");
var sect1DarkProp = window.getComputedStyle(sect1Darkner);
var sect1DarkerOpacity = Number(sect1DarkProp.getPropertyValue("opacity"));
function cloudMoveSect1(){
    var clouds = document.getElementById("AllCloudsSect1").children;
    var sect1 = document.getElementById("section1");

    for(var i = 0; i< clouds.length; i++){
        clouds[i].style.transform = `translateX(${window.pageYOffset / 6}px)`;
    }

    if( 74 - window.pageYOffset / 50 > 0){
        sect1.style.backgroundColor = `rgb(${74 - window.pageYOffset / 80}, ${112 - window.pageYOffset / 40}, ${175 - window.pageYOffset / 40})`;
    }

    
    if(sect1DarkerOpacity + window.pageYOffset / 560 <= 1){
        sect1Darkner.style.opacity =   `${sect1DarkerOpacity + window.pageYOffset / 560}`
    }


}

document.addEventListener("scroll", cloudMoveSect1);

// sect 2 ---------------------------------------------------------------------

var signInBt = document.getElementById("signInBt");
var signUpBt = document.getElementById("signUpBt");



signInBt.addEventListener("click", ()=>{
    var xhr = new XMLHttpRequest();
    var foundId = false;
    xhr.open("GET","processing.php?list", true);

    xhr.onload = function(){
        if(this.status == 200){
            var resp = this.responseText.split("\r\n");
            for(let i = 0; i < resp.length; i++){
                var respEmail = resp[i].split(":")[2];
                var respPassword = resp[i].split(":")[3];
                if(document.querySelector("input[name=\"sIEmail\"]").value == respEmail || document.querySelector("input[name=\"sIPassw\"]").value == respPassword){
                    foundId = true;
                    window.open(`user.html?name=${resp[i].split(":")[0]}&idNum=${resp[i].split(":")[4]}&tables=${resp[i].split(":")[5]}`,"_blank")
                    break
                }
            }
            if(foundId == false){
                document.getElementById("signInWrong").style.maxHeight = "200px";
                document.getElementById("signInWrong").style.opacity = "1";
            }
        }
    } 

    xhr.send(); 
});




function addPersonToList(name, Np, email, pass, response){
    var idNumber = String(Math.floor(Math.random() * 900)).padStart(4, "0");
    var NumOfTables = 1;
    var hieghestNUm = 1;
    var listOfTables = [];
    for( var k in response){
        let currHeighestNum = response[k].split(":")[5].split(",").sort(function(a, b){return b-a})[0];
        hieghestNUm = (hieghestNUm < currHeighestNum ? currHeighestNum : hieghestNUm);
    }
    if ( Np - Math.ceil(Np / 6)*6 >= -3){
        NumOfTables = Math.ceil(Np / 6);
    }else if(Math.ceil(Np / 6) != 1){
        NumOfTables = Math.ceil(Np / 6) - 1;
    }
    for( var m = 1; m < NumOfTables + 1; m++){
        listOfTables.push(String(Number(hieghestNUm) + Number(m)));
    }

    var parans = "info="+ name + ":" + Np + ":" + email + ":" + pass + ":" + idNumber + ":" + listOfTables.join(",");


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "processing.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function(){
        if(this.status == 200){
            window.open(`user.html?name=${name}&idNum=${idNumber}&tables=${listOfTables.join(",")}`, "_blank");
        }
    }

    xhr.send(parans);
}


function submitRanCode(radomCode, email){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "processing.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var ranCodeSend = "ranCode=" + radomCode + "," + email;
    xhr.onload = function(){
        if(this.response == 200){
            console.log(this.responseText);
        }
    }
    xhr.send(ranCodeSend);   
}

function valadateEmail(name, Np, email, pass, response){
    signUpBt.removeEventListener("click", addPersonStart);
    document.getElementById("signUpInputs").style.opacity = "0";
    var randomVarification = Math.ceil(Math.random() * 999999);
    setTimeout(()=>{
        document.getElementById("signUpInputs").style.display = "none";
        document.getElementById("signUpVara").style.display = "flex";
        setTimeout(()=>{
            document.getElementById("signUpVara").style.opacity = "1";
        }, 50)

        submitRanCode(randomVarification, email);

        signUpBt.value = "Verify";
        document.getElementById("signUp").style.minHeight = "280px";


        signUpBt.addEventListener("click", ()=>{
            if( document.querySelector("input[name=sUCode]").value == String(randomVarification)){
                addPersonToList(name, Np, email, pass, response);
            }else{
                document.getElementById("signUpVaraText").style.maxHeight = "200px";
                document.getElementById("signUpVaraText").style.opacity = "1";
                document.getElementById("signUp").style.minHeight = "280px";
            }
        });



    }, 500)
}


function addPersonStart(){
    var xhr = new XMLHttpRequest();
    var foundId = false;
    xhr.open("GET","listOfPeaple.txt", true);
    xhr.onload = function(){
        if(this.status == 200){
            var resp = this.responseText.split("\r\n");
            for(let i = 0; i < resp.length; i++){
                var respEmail = resp[i].split(":")[2];
                if(document.querySelector("input[name=\"sUEmail\"]").value == respEmail){
                    document.getElementById("signUpWrong").style.maxHeight = "200px";
                    document.getElementById("signUpWrong").style.opacity = "1";
                    document.getElementById("signUp").style.minHeight = "380px";
                    break
                }
            }
            if(foundId == false && document.querySelector("input[name=\"sUEmail\"]").value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/)){
                valadateEmail(document.querySelector("input[name=\"sUFLname\"]").value, document.querySelector("input[name=\"sUNpeap\"]").value, document.querySelector("input[name=\"sUEmail\"]").value, document.querySelector("input[name=\"sUPassw\"]").value, resp );
            }else{
                document.getElementById("signUpWrong").style.maxHeight = "200px";
                document.getElementById("signUpWrong").style.opacity = "1";
                document.getElementById("signUp").style.minHeight = "380px";
            }
        }
    } 

    xhr.send()
}


signUpBt.addEventListener("click", addPersonStart);


document.querySelector("input[name=sUCode]").oninput = function () {
    if (this.value.length > 6) {
        this.value = this.value.slice(0,6); 
    }
}

// section 3 --------------------------------------------------------------

document.addEventListener("scroll", ()=>{
    var sect3MiniSectHeading = document.getElementsByClassName("appearWhen");
    for(let i = 0; i < sect3MiniSectHeading.length; i++){
        if(sect3MiniSectHeading[i].getBoundingClientRect().top <= (window.innerHeight/1.5)){
            sect3MiniSectHeading[i].style.opacity = "1";
        }else{
            sect3MiniSectHeading[i].style.opacity = "0";
        }
    }
});


// footer ----------------------------------------------------

document.querySelector("#footerEmailSignUp div").addEventListener("click", ()=>{
    let email = document.querySelector("#footerEmailSignUp input").value;
    if(email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/)){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "processing.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function(){
            if(this.status == 200){
                document.querySelector("#footerEmailSignUp input").style.outline = "2px solid green";
            }else{
                document.querySelector("#footerEmailSignUp input").style.outline = "2px solid yellow";
            }
        }
        xhr.send("emailNews=" + email);
    }else{
        document.querySelector("#footerEmailSignUp input").style.outline = "2px solid red";
    }
    
});

