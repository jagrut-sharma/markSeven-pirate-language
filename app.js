const inputTxt = document.querySelector(".txt-area");
const translateBtn = document.querySelector(".btn");
const outputDiv = document.querySelector(".output");

translateBtn.addEventListener("click", eventHandler);

let urlAPI = "https://api.funtranslations.com/translate/pirate.json";

let translatedTxt;

function eventHandler(){
    let finalURL = urlAPI + "?text=" + encodeURIComponent(inputTxt.value);

    fetch(finalURL)
    .then(response => response.json())
    .then(json => {
        translatedTxt = json;
        outputDiv.innerText = translatedTxt.contents.translated;
    })
    .catch(errorHandler);
}

function errorHandler(err){

    if (translatedTxt.error.code == 429) {
        outputDiv.innerText = translatedTxt.error.message;
        console.log(translatedTxt.error.message);
    }

    else{
        outputDiv.innerHTML = err + "<br>" + "<br>" + "Error from server side: " + translatedTxt.error.code + " " + translatedTxt.error.message + "<br>" + "<br>" + "If you have entered a new line(pressed enter) in input area, please avoid doing that, it will give error.";

        console.log(err);
        console.log("Error from server side: " + translatedTxt.error.code + " " + translatedTxt.error.message);
        console.log("If you have entered a new line(pressed enter) in input area, please avoid doing that, it will give error.");
    }
}