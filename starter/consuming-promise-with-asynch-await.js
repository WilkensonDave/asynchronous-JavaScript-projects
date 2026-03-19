"use strict"
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//country data
// const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
// const data = await res.json();
// renderCountry(data[0]);


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
    countriesContainer.insertAdjacentHTML("beforeend", html)
    countriesContainer.style.opacity = 1;
}

const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const renderError = function(message){
    countriesContainer.insertAdjacentText('beforeend', message);
    countriesContainer.style.opacity = 1
}

const whereAmI = async function(){
    //Geolocation
    try{
        const pos = await getPosition()
        const {latitude:lat, longitude:lng} = pos.coords;
        
        //reverse Geocoding
        const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        
        if(!resGeo.ok) throw new Error("We can not display the country");
        const dataGeo = await resGeo.json();
    
        const countryName = `${dataGeo.countryName.split("(")[0]}`
        const resCountry = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)

        if(!resCountry.ok) throw new Error("Unable to complete your request.");

        const countryData = await resCountry.json()
        renderCountry(countryData[0]);
        return `You are currently in ${dataGeo.city}`
    }catch(err){
        console.error(`${err} ❌❌`);
        renderError(`💢${err.message}`)
        //reject promise that is returned from async function
        throw err;
    }
    
}

console.log('location');
// const city = whereAmI();
// console.log(city);
// whereAmI().then(city => console.log(`${city}`)).catch(err =>
//     console.error(`${err.message}🔔🔔🔟`)).finally(()=>{
//     console.log("I love you!");
// });

//return value from async functions
(async function(){
    try{
        const city = await whereAmI();
        console.log(city);
    }catch(err){
        console.error(err);
    }
    console.log("3: Finish to love you!");
})();
