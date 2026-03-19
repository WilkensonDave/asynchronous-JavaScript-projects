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


const loadNPause = async function(){
    try{
        let img = await createImage("img/img-3.jpg");
        console.log("image loaded");
        await wait(2);
        img.style.display = "none";

        let img1 = await createImage("img/img-1.jpg");
        console.log("image loaded");
        await wait(3)
        img1.style.display = "none"

        let img2 = await createImage("img/img-2.jpg")
        console.log("image loaded");
        await wait(4)
        img2.style.display = "none"
    }catch(err){
        console.log(err);
    }
}

loadNPause();

const loadAll = async function(imgArr){
    try{
        let imgs = imgArr.map(async img =>  await createImage(img))
        let imgsEl = await Promise.all(imgs)
        imgsEl.forEach(img => img.classList.add("parallel"))
    }catch(err){
        console.log(err);
    }
}

loadAll(["img/img-2.jpg", "img/img-1.jpg", "img/img-3.jpg"]);

