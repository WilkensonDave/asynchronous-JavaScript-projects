"use strict"

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const containerImage = document.querySelector(".images");

const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds*1000)
    });
};


const createImage = function(path){
    return new Promise(function(resolve, reject){
        let image =  document.createElement("img");
        image.src = path
        image.addEventListener("load", function(){
            containerImage.append(image);
            resolve(image);
        })

        image.addEventListener("error", function(){
            reject(new Error("Unable to load image"));
        });
    })
}

let img;
createImage("img/img-3.jpg").then(data =>{
    img = data;
    console.log("image loaded");
    return wait(2);
}).then(() =>{
    img.style.display = "none";
    return createImage("img/img-1.jpg");
}).then(data =>{
    img = data;
    console.log("image loaded");
    return wait(3);
}).then(() =>{
    img.style.display = "none";
    return createImage("img/img-2.jpg")
}).then(data =>{
    img = data;
    console.log("image loaded");
    return wait(4)
}).then(()=>{
    img.style.display = "none";
})
.catch(error =>{
    console.error(error.message);
})