'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal
// /https://countries-api-836d.onrender.com/countries/
///https://restcountries.com/v3.1/name/Haiti

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const getCountryData = function(country, currency, language){
    let baseUrl = `https://restcountries.com/v3.1/name/${country}/`
    const request = new XMLHttpRequest();
    request.open("GET", baseUrl)
    request.send();
    request.addEventListener("load", function(e){
        const [data] = JSON.parse(this.responseText)
        const html = `
            <article class="country">
                <img class="country__img" src="${data.flags.svg}" alt="${data.flags.alt}"/>
                <div class="country__data">
                <h3 class="country__name">${data.name.official}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M</p>
                <p class="country__row"><span>🗣️</span>${data.languages[language]}</p>
                <p class="country__row"><span>💰</span>${data.currencies[currency].name}</p>
                </div>
            </article>
        `
        countriesContainer.insertAdjacentHTML("beforeend", html)
        countriesContainer.style.opacity = 1;
    })
}

getCountryData('Haiti', "HTG", 'hat');
getCountryData("Canada", "CAD", "fra");
getCountryData("Brasil", "BRL",  "por");
