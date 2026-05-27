const BOT_TOKEN =
"8616893292:AAE1Hmjy1dD_1CQOqW_benthaj0RvGFKS_c";

const CHAT_ID = "8955171740";

let currentPrice = 0;
let targetPrice = 0;
let mode = "up";
let running = false;

const priceEl =
document.getElementById("price");

const statusEl =
document.getElementById("status");

const popup =
document.getElementById("popup");

const popupPrice =
document.getElementById("popupPrice");

function setMode(selectedMode){

mode = selectedMode;

if(mode === "up"){

statusEl.innerText =
"UP Alert Selected";

}else{

statusEl.innerText =
"DOWN Alert Selected";

}

}

function startAlert(){

targetPrice = parseFloat(
document.getElementById("target").value
);

if(!targetPrice){

alert("Enter target price");
return;

}

running = true;

statusEl.innerText =
"Alert Running...";

}

function stopAlert(){

running = false;

statusEl.innerText =
"Alert Stopped";

}

function closePopup(){

popup.style.display = "none";

}

const audio = new Audio(
"https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
);

async function getPrice(){

try{

const response = await fetch(
"https://api.bybit.com/v5/market/tickers?category=spot&symbol=SOLUSDT"
);

const data = await response.json();

currentPrice =
parseFloat(
data.result.list[0].lastPrice
);

priceEl.innerText =
"$" + currentPrice.toFixed(2);

if(running){

if(
mode === "up" &&
currentPrice >= targetPrice
){

triggerAlert();

}

if(
mode === "down" &&
currentPrice <= targetPrice
){

triggerAlert();

}

}

}catch(error){

statusEl.innerText =
"Connection Error";

console.log(error);

}

}

function triggerAlert(){

running = false;

popup.style.display = "flex";

popupPrice.innerText =
"$" + currentPrice.toFixed(2);

statusEl.innerText =
"TARGET HIT!";

audio.play();

fetch(
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🚨 SOL ALERT! Price: $${currentPrice.toFixed(2)}`
)
.then(response => response.json())
.then(data => {

console.log(data);

})
.catch(error => {

console.log(error);

});

}

setInterval(getPrice, 2000);

getPrice();

