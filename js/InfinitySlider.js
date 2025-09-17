import { widthSliderWrap } from "./ElemSizeControl.js";

// массив с адресами изображений

let slides = [
  //"https:\/\/olegeduc.github.io\/food-trade\/image/action/Акция-Гречка-900г.gif",
  "https:\/\/olegeduc.github.io\/food-trade\/image/action/ПечивоКрапкаВаніль.jpg",
  "https:\/\/olegeduc.github.io\/food-trade\/image/action/ПечивоКрапкаКакао.jpg",
  "https:\/\/olegeduc.github.io\/food-trade\/image/action/ПечивоКрапкаКанапкаПломбір.jpg",
 "https:\/\/olegeduc.github.io\/food-trade\/image/action/МаксиФрукт-3л-баннер-Общий.jpg",
  
  "https:\/\/olegeduc.github.io\/food-trade\/image/action/ПечивоКрапкаКанапкаШоколад.jpg",
  "https:\/\/olegeduc.github.io\/food-trade\/image/action/ПечивоПодільськеАрахіс.jpg",
  "https:\/\/olegeduc.github.io\/food-trade\/image/action/ПечивоПодільськеПряжМолоко.jpg",
   "https:\/\/olegeduc.github.io\/food-trade\/image/action/МаксиФрукт-3л-баннер-Общий.jpg",
  
  //"./image/action/Акция-Гречка-900г.gif",
  //"./image/action/ПечивоКрапкаВаніль.jpg",
 // "./image/action/ПечивоКрапкаКакао.jpg",
 // "./image/action/ПечивоКрапкаКанапкаПломбір.jpg",
  //"./image/action/МаксиФрукт-3л-баннер-Общ-Дост.jpg",

  //"./image/action/ПечивоКрапкаКанапкаШоколад.jpg",
  // "./image/action/ПечивоПодільськеАрахіс.jpg",
  // "./image/action/ПечивоПодільськеПряжМолоко.jpg",
  //  "./image/action/МаксиФрукт-3л-баннер-Общ-Дост.jpg",
];

let slider = [];
for (let i = 0; i < slides.length; i++) {
  slider[i] = slides[i];
  //slides[i].remove();
}

let step = 0; // шаг
let offset = 0; // смещение изображения

export function draw() {
  let img = document.createElement("img");
  img.src = slider[step];
  img.classList.add("slide-single");
  document.querySelector("#slide-wrap").style.width = parseInt(widthSliderWrap) + "px";
  img.style.left = offset * parseInt(widthSliderWrap) + "px";
  document.querySelector("#slide-wrap").appendChild(img);

  // console.log('cerate document.querySelector(".slider-wrap").appendChild(img)  ' + widthIMG.offsetWidth);
  // console.log('widthIMG.offsetWidth  ' + window.getComputedStyle(widthSliderWrap));

  if (step + 1 >= slider.length) {
    step = 0;
  } else {
    step++;
  }
  offset = 1;
}

function left() {
  let slides2 = document.querySelectorAll(".slide-single");
  //
  let offset2 = 0;
  for (let i = 0; i < slides2.length; i++) {
    // slides2[i].style.left = offset2 * 512 - 512 + "px";
    slides2[i].style.left =
      offset2 * parseInt(widthSliderWrap) - parseInt(widthSliderWrap) + "px";
    offset2++;
  }

  setTimeout(() => {
    slides2[0].remove();
    draw();
  }, 1300);
}

setInterval(function () {
  left();
  // slides2[0].remove();
}, 3000);

// draw();
// draw();

// href="https://www.youtube.com/watch?v=gBgD9ieCJpE&ab_channel=WebDev%D1%81%D0%BD%D1%83%D0%BB%D1%8F.%D0%9A%D0%B0%D0%BD%D0%B0%D0%BB%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%9B%D1%83%D1%89%D0%B5%D0%BD%D0%BA%D0%BE">
// видео по бесконечному слайдеру</a>

