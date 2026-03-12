'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal
// /https://countries-api-836d.onrender.com/countries/
///https://restcountries.com/v3.1/name/Haiti

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// const request = new XMLHttpRequest();
// request.open("GET", `https://countries-api-836d.onrender.com/${country}/`)
// request.send();

const renderCountry = function(data, className=''){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" alt="${data.flags.alt}"/>
            <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M</p>
            <p class="country__row"><span>🏙</span>${data.capital}</p>
            <p class="country__row"><span>🌊</span>${data.continents}</p>
            </div>
        </article>
        `
    countriesContainer.insertAdjacentHTML("beforeend", html);
}

const renderError = function(message){
    countriesContainer.insertAdjacentText('beforeend', message);
    countriesContainer.style.opacity = 1
}

//promise chaining

const getJson = function(url, errorMessage = 'Something went wrong'){
    return fetch(url).then(response => {
        if(!response.ok){
            throw new Error(`${errorMessage} ${response.status}`)
        }
        return response.json();
    })
}

const getCountryData = function(country){
    const base = `https://restcountries.com/v3.1/name/${country}`
    getJson(base, 'Country could not be found').then(data =>{
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        if(!neighbour){
            throw new Error('No neighbour found!');
        }
        return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country could not be found.');
    }).then(newdata =>{
        renderCountry(newdata[0], 'neighbour');
    }).catch(error =>{
        renderError(`Something went wront.⚙‼‼---${error.message}`);
    }).finally(()=>{
        countriesContainer.style.opacity = 1;
    });
}


// const getCountryData = function(country){
//     const base = `https://restcountries.com/v3.1/name/${country}`
//     fetch(base).then(response => {
//         if(!response.ok){
//             throw new Error(`Country not found.${response.status}`);
//         }
//         return response.json()
//     }).then(data => {
//         renderCountry(data[0])
//         //country neighbour
        
//         const neighbour = data[0].borders?.[0];
//        if(!neighbour) return;
//        return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     }).then(response => response.json()).then(newdata =>{
//         console.log(newdata[0]);
//         renderCountry(newdata[0], 'neighbour');
//     }).catch(error => {
//         console.error(`${error} 💢💢💢`);
//         renderError(`Something went wrong.😞😞${error.message}. Try again!`);
    
//     }).finally(() =>{
//       countriesContainer.style.opacity = 1; 
//     });
// };


btn.addEventListener("click", function(e){
    getCountryData("Australia");
});

