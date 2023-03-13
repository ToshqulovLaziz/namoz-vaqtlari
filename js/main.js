const API_PATH = "https://islomapi.uz/api/present/week?region=";

const elVaqtList = document.querySelector(".js-vaqt-list");
const elVaqtTemp = document.querySelector(".js-vaqt-temp").content;
const newFragment = new DocumentFragment();

const elForm = document.querySelector(".js-form");
const elFormInput = elForm.querySelector(".js-input");

function renderVaqts(vaqts){
    elVaqtList.innerHTML = null;

    vaqts.forEach((vaqt) => {
        const cloneTemp = elVaqtTemp.cloneNode(true);

        cloneTemp.querySelector(".js-vaqt-region").textContent = vaqt.region;
        cloneTemp.querySelector(".js-vaqt-date").textContent = "Sana: " + vaqt.date.slice(0,10);
        cloneTemp.querySelector(".js-vaqt-weekday").textContent ="Hafta kuni " + vaqt.weekday;
        cloneTemp.querySelector(".js-vaqt-bomdod").textContent = "Bomdod: " + vaqt.times.tong_saharlik;
        cloneTemp.querySelector(".js-vaqt-quyosh").textContent = "Quyosh: " +  vaqt.times.quyosh;
        cloneTemp.querySelector(".js-vaqt-peshin").textContent = "Peshin: " + vaqt.times.peshin;
        cloneTemp.querySelector(".js-vaqt-asr").textContent = "Asr: " + vaqt.times.asr;
        cloneTemp.querySelector(".js-vaqt-shom").textContent = "Shom: " + vaqt.times.shom_iftor;
        cloneTemp.querySelector(".js-vaqt-hufton").textContent = "Hufton: " + vaqt.times.hufton;

        newFragment.appendChild(cloneTemp);
    });
    elVaqtList.appendChild(newFragment);
}

function getVaqts(API) {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
        renderVaqts(data);
    });
}

elForm.addEventListener("submit",(evt) => {
    evt.preventDefault();
    const inputValue = elFormInput.value.trim();

    getVaqts(API_PATH + inputValue);
});