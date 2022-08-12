function listenRadio (inputName, cb) {
    const radioButtons = document.querySelectorAll(inputName);
    for(const radioButton of radioButtons) {
        radioButton.addEventListener('change', cb)
    }
}

//Call listenRadio
listenRadio('input[name="select"]', showSelected)

function showSelected(_e) {
    if (this.checked) {
        const result = document.querySelector('#result');
        result.removeAttribute("hidden");
        executor(this.value);
        window.location.href = '#result';
    }
}

function executor(radioValue){
    const showResult = document.querySelector('#show-result');
    let url = 'http://www.boredapi.com/api/activity?type=' + radioValue;
    let request = new XMLHttpRequest();
              
    request.open('GET', url, true);
    request.onload = () => {
        const obj = JSON.parse(request.responseText);
        showResult.innerText = obj.activity;
        googleValue = obj.activity;
        }
    request.send();
}  

let googleValue;
const googleIt = document.getElementById('googleIt');
const tryAgain = document.getElementById('try-again');
const back = document.getElementById('goBack');

googleIt.addEventListener('click', googleItUrl);
tryAgain.addEventListener('click', reload);
back.addEventListener('click', goBack);

function googleItUrl() {
    window.open(
        'https://www.google.com/search?q=' + googleValue,
        '_blank'
    );
}

function goBack() {
    window.location.href = '#choose-activity'
}

function reload() {
    let radios = document.getElementsByName('select');

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            executor(radios[i].value);
            break;
        }
    }
}