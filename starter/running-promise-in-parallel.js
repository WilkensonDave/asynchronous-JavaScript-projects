"use strict"

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const getJson = function(url, errorMessage = 'Something went wrong'){
    return fetch(url).then(response => {
        if(!response.ok){
            throw new Error(`${errorMessage} ${response.status}`)
        }
        return response.json();
    })
}

const get3Countries = async function(c1, c2, c3){
    try{
        // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`);
        // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`);
        // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`);
        
        const data = await Promise.all([
            getJson(`https://restcountries.com/v3.1/name/${c1}`),
            getJson(`https://restcountries.com/v3.1/name/${c2}`),
            getJson(`https://restcountries.com/v3.1/name/${c3}`)
        ])

        console.log(data.map(d => d[0].capital));
    } catch(err){
        console.error(err);   
    }
}

get3Countries("portugal", "Haiti", "Brasil");


//GGOD TO KNOW
//The two promises combinators are race, allSettled and any

//1) Promise.race
(async function(){
    const res = await Promise.race([
        getJson(`https://restcountries.com/v3.1/name/spain`),
        getJson(`https://restcountries.com/v3.1/name/Brasil`),
        getJson(`https://restcountries.com/v3.1/name/canada`),
    ]);
    console.log(res[0]);
})();


//this is to reject the promise after a certain time.
const timeoutPromise = function(sec){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error("Request took too long! Try again."));
        }, sec*1000);
    })
}

//here will be like a race, the one that wins will be settled
//the race will be against each other
//In this example the one who happens first will be settle and the rest will be rejected
//if the timeoutPromise happens first it will be settle and the res will be rejected.

//THE TWO MOST IMPORTANT PROMISE COMBINATORS ARE 
// Promise.race and Promise.allSettled

Promise.race([
    getJson(`https://restcountries.com/v3.1/name/Iran`),
    timeoutPromise(1.5)
]).then(res => console.log(res[0])).catch(err => console.error(err));


//Promise.allSettled
//this takes an array of promises and return another array of all the settle promises
//this will happend no matter if the the promise got rejected or not.
Promise.allSettled([
    Promise.resolve("success"),
    Promise.reject("Error"),
    Promise.resolve("Good job"),
]).then(res => console.log(res))

//Promise.all will shortcircut
//Promise. all() will reject immediately upon any of the input promises rejecting.
//In comparison, the promise returned by Promise. allSettled() 
//will wait for all input promises to complete, 
// regardless of whether or not one rejects

Promise.all([
    Promise.resolve("success"),
    Promise.reject("Error"),
    Promise.resolve("Good job"),
]).then(res => console.log(res)).catch(err => console.error(`Promise rejected ❌❌${err}`))

//Promise.any will return the first fulfilled promise
//Promise.any will return the first fulfilled promise
//It will ignore rejected promises
//The result of Promise.any is always going
// to be a fullfilled promise unless all of them reject


Promise.any([
    Promise.resolve("success and amazing job"),
    Promise.reject("Error"),
    Promise.resolve("Good job"),
]).then(res => console.log(res)).catch(err => console.error(`got rejected ❌❌${err}`))