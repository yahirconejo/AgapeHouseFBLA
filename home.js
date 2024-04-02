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

// section 2 -----------------------------------------------------------

var fallingCansContainer = document.getElementById("fallingCansContainer");


function makeNewCanFall(){
    var canCont = document.createElement("div");
    canCont.classList.add("fallingCans");

    var can = document.createElement("div");
    can.classList.add("fallingCans1");

    var canM1 = document.createElement("div");
    canM1.classList.add("fallingCans1of1");
        can.append(canM1);
    var canM2 = document.createElement("div");
    canM2.classList.add("fallingCans1of2");
        can.append(canM2);
    var canM3 = document.createElement("div");
    canM3.classList.add("fallingCans1of3");
        can.append(canM3);


    can.style.transform = `translateX(${Math.floor(Math.random() * 50) * (Math.random() < 0.5 ? -1 : 1)}px) rotate(${Math.floor(Math.random() * 360)}deg)`;

    canCont.append(can);


    fallingCansContainer.append(canCont);

}


var sect2Boxes = document.getElementsByClassName("sect2Box");
sect2Boxes[1].style.left = "-70%";
sect2Boxes[1].style.transition = "none";

function boxFinishedFilling(currentBoxNum){
    var currentBox = document.querySelector(`.sect2Box:nth-child(${currentBoxNum})`);
    document.querySelector(`.sect2Box:nth-child(${currentBoxNum}) .sect2Box1`).style.transform = "rotate(0deg)";
    document.querySelector(`.sect2Box:nth-child(${currentBoxNum}) .sect2Box2`).style.transform = "rotate(0deg)";
    setTimeout(()=>{
        fallingCansContainer.innerHTML = "";
        currentBox.style.left = "150vw";
        setTimeout(()=>{
            document.querySelector(`.sect2Box:nth-child(${currentBoxSect2})`).style.transition = "left 2s ease-out";
            document.querySelector(`.sect2Box:nth-child(${currentBoxSect2})`).style.left = "50%";
            setTimeout(()=>{
                currentNumberOfCansFallen = 0;
                makeSetOfCansFall(cansYouWantToFall);
            }, 2000);
        }, 1000);
        setTimeout(()=>{
            document.querySelector(`.sect2Box:nth-child(${currentBoxNum})`).style.transition = "none";
            document.querySelector(`.sect2Box:nth-child(${currentBoxNum})`).style.left = "-70%";
            document.querySelector(`.sect2Box:nth-child(${currentBoxNum}) .sect2Box1`).style.transform = "rotate(-260deg)";
            document.querySelector(`.sect2Box:nth-child(${currentBoxNum}) .sect2Box2`).style.transform = "rotate(250deg)";
        },2000);
    }, 1000);
}

var stopFallingCans = false;
var currentNumberOfCansFallen = 0;
var currentBoxSect2 = 1;
var cansYouWantToFall = 10;
function makeSetOfCansFall(howMany){
    var wipeOutFallingCans = 0;
    (function fallLoop() {
        var randNumFallCan = Math.round(Math.random() * (1000 - 400)) + 400;
        setTimeout(function() {
            wipeOutFallingCans++
            if(window.innerWidth < 780){
                stopFallingCans = true; 
            }else{
                stopFallingCans = false;
            }
            if(!stopFallingCans){
                if(wipeOutFallingCans <= howMany){
                    currentNumberOfCansFallen++
                    makeNewCanFall();
                    fallLoop();
                }else{
                    boxFinishedFilling(currentBoxSect2);
                    currentBoxSect2 = currentBoxSect2 == 2 ? 1 : 2;
                }
            }else{
                document.querySelector(`.sect2Box:nth-child(${currentBoxSect2}) .sect2Box1`).style.transform = "rotate(-12deg)";
                document.querySelector(`.sect2Box:nth-child(${currentBoxSect2}) .sect2Box2`).style.transform = "rotate(27deg)";
                window.addEventListener("resize", shouldCansFallSect2);
            }
            
        }, randNumFallCan);
    }());
}


function shouldCansFallSect2(){
    var windowWidth = window.innerWidth;
    if(windowWidth < 780){
        document.querySelector(`.sect2Box:nth-child(${currentBoxSect2}) .sect2Box1`).style.transform = "rotate(-12deg)";
        document.querySelector(`.sect2Box:nth-child(${currentBoxSect2}) .sect2Box2`).style.transform = "rotate(27deg)";
        stopFallingCans = true; 
    }else{
        document.querySelector(`.sect2Box:nth-child(${currentBoxSect2}) .sect2Box1`).style.transform = "rotate(-260deg)";
        document.querySelector(`.sect2Box:nth-child(${currentBoxSect2}) .sect2Box2`).style.transform = "rotate(250deg)";
        stopFallingCans = false;
        makeSetOfCansFall(cansYouWantToFall - currentNumberOfCansFallen);
        window.removeEventListener("resize", shouldCansFallSect2);
    }
}






function startCansFallingAnSect2(){
    if(sect2Boxes[0].getBoundingClientRect().y <= (window.innerHeight/2 + 200)){
        window.addEventListener("resize", shouldCansFallSect2);
        shouldCansFallSect2();
        document.removeEventListener("scroll", startCansFallingAnSect2)
    }
    
}


document.addEventListener("scroll", startCansFallingAnSect2);
// section 5 ----------------------------------------------------------------

function smallEventDiscriptionClick(event){
    if(event.target.parentNode.children[1].classList.contains("smallScreenSect5TopEventsInfoTextShow")){
        event.target.parentNode.children[1].classList.remove("smallScreenSect5TopEventsInfoTextShow");
    }else{
        event.target.parentNode.children[1].classList.add("smallScreenSect5TopEventsInfoTextShow");
    }
}




// section 6 ----------------------------------------------------------------

document.querySelector("#emailAnBT div").addEventListener("click", ()=>{
    let email = document.querySelector("#emailAnBT input").value;
    if(email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/)){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "processing.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function(){
            if(this.status == 200){
                document.querySelector("#emailAnBT input").style.outline = "2px solid green";
            }else{
                document.querySelector("#emailAnBT input").style.outline = "2px solid yellow";
            }
        }
        xhr.send("emailNews=" + email);
    }else{
        document.querySelector("#emailAnBT input").style.outline = "2px solid red";
    }
    
});

// section 7 ----------------------------------------

var todaysHours = document.querySelector("#sect7Info h4");
var hoursDropDown = document.getElementById("hoursDropDown");

var currentDayOpen = document.getElementById("currentDayOpen");
var currentDay = new Date();
if(currentDay.getDay() == 1){
    currentDayOpen.innerHTML = "9:00 am – 3:00 pm";
    hoursDropDown.children[0].style.fontWeight = "600";
}else if(currentDay.getDay() == 2){
    currentDayOpen.innerHTML = "9:00 am – 3:00 pm";
    hoursDropDown.children[1].style.fontWeight = "600";
}else if(currentDay.getDay() == 3){
    currentDayOpen.innerHTML = "9:00 am – 3:00 pm";
    hoursDropDown.children[2].style.fontWeight = "600";
}else if(currentDay.getDay() == 4){
    currentDayOpen.innerHTML = "9:00 am – 3:00 pm";
    hoursDropDown.children[3].style.fontWeight = "600";
}else if(currentDay.getDay() == 5){
    currentDayOpen.innerHTML = "9:00 am – 12:00 pm";
    hoursDropDown.children[4].style.fontWeight = "600";
}else if(currentDay.getDay() == 6){
    currentDayOpen.innerHTML = "Closed";
    hoursDropDown.children[5].style.fontWeight = "600";
}else if(currentDay.getDay() == 0){
    currentDayOpen.innerHTML = "Closed";
    hoursDropDown.children[6].style.fontWeight = "600";
}

var todaysHoursOpen = false;
todaysHours.addEventListener("click", ()=>{
    if(todaysHoursOpen == false){
        hoursDropDown.style.maxHeight = "200px";
        todaysHoursOpen = true;
    }else{
        hoursDropDown.style.maxHeight = "0px";
        todaysHoursOpen = false;
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