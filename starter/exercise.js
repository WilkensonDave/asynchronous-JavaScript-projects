"use strict"
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


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


const whereAmI = function(lat, lng){
    const base = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
    fetch(base).then(response =>{
        if(!response.ok){
            throw new Error(`Invalid Request. ${response.status}`);
        }
        return response.json();
    }).then(data =>{
        const countryName = `${data.countryName}`

        return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    }).then(response =>{
        if(!response.ok){
            throw new Error(`Invalid request. ${response.status}`)
        }
        return response.json()
        
    }).then(data =>{
        console.log(data[0]);
        renderCountry(data[0]);
    }).catch(error =>{
        console.log(`${error.message}`);
    }).finally(() =>{
        countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener("click", function(e){
    whereAmI(-33.933, 18.474);
});


console.log("test start");
setTimeout(() =>console.log('0 sec timer'), 0);
Promise.resolve('Resolve promise 1').then(res=>console.log(res));
Promise.resolve("Resolve promise 2").then(res => {
    for(let i =0; i <10; i++){
        console.log(res);
    }
    
});
console.log('Test end');





