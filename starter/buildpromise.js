"use strict"

// const { jsx } = require("react/jsx-runtime");

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const lotteryPromise = new Promise(function(resolve, reject){
    console.log('Keep waiting, the lottery is happening.');
    setTimeout(function(){
        if(Math.random() >= 0.5){
        resolve('You Win✅✅');
        }else{
            reject(new Error("Sorry, you lost.✳"))
        }
    }, 2000)

});

lotteryPromise.then(data => console.log(data)).catch(error => console.error(error));

//PROMISIFYING SETTIMEOUT
const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds*1000)
    });
};


wait(1).then(() =>{
    console.log(`1 second has passed`);
    return wait(1)
}).then(() =>{
    console.log('2 seconds have passed');
    return wait(2)
}).then(() =>{
    console.log('3 seconds have passed');
    return wait(3)
}).then(() =>{
    console.log("4 seconds have passed");
}).catch(error => console.error(error))

//a better way to create a fullfill promise easily and immediately
Promise.resolve('anjbkmfvmn,').then(x => console.log(x));
Promise.reject("rejected").catch(x => console.log(x));

//promise based function
// const getPosition = function(){
//     return new Promise(function(resolve, reject){
//         // navigator.geolocation.getCurrentPosition(position =>{
//         // resolve(position)
//         // }, err =>{
//         //     reject(err);
//         // })
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// }

getPosition().then(data => console.log(data));

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


const whereAmI = function(){
    getPosition().then(pos => {
        const {latitude : lat, longitude : lng} = pos.coords;
        console.log(lat, lng);
        return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    }).then(res =>{
        if(!res.ok){
            throw new Error("Problem with the geolocation")
        }
        return res.json()
        
    }).then(data=>{
        console.log(data);
         const countryName = `${data.countryName.split("(")[0]}`
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    }).then(res =>{
        if(!res.ok){
            throw new Error("Country not found")
        }
        return res.json();
    })
    .then(data =>{
        renderCountry(data[0]);
    }).catch(error =>{
        console.log(`${error.message}`);
    }).finally(() =>{
        countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener("click", function(e){
    whereAmI();
});

