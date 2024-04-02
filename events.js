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