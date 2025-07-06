
import {  setSizeCounter } from "./CounterDown.js";


export let widthSliderWrap = 512;

//  Возвращает высоту экрана
export function getHeightWindow() {
  if (window.innerHeight > window.innerWidth) {
    widthSliderWrap = Math.min(parseInt(512), window.innerWidth*0.95);
    console.log('***window.innerWidth '+window.innerWidth);
     console.log('**widthSliderWrap '+widthSliderWrap);
    return Math.max(window.innerHeight, window.innerWidth);
  } else {
   widthSliderWrap = Math.min(parseInt(512), window.innerHeight*0.95);
     console.log('***window.innerWidth '+window.innerHeight);
     console.log('**widthSliderWrap '+widthSliderWrap);
    return Math.min(window.innerHeight, window.innerWidth);    
  }
}

// Внутренний размер окна — это ширина и высота области просмотра (вьюпорта).
// Объект window предоставляет свойства innerWidth и innerHeight:

const footer = document.querySelector(".footer");
window.addEventListener("resize", () => {
  getHeightWindow();
  setHeightUserWindow();
  setNameBtnClearSearch();
  setSizeCounter('.promotion-wrap');
});

// устанавливает надпись для кропки очистки поиска
export function setNameBtnClearSearch() {
  const btn = footer.querySelector(".search #btn-search-clear");

  if (!document.querySelector(".search #btn-search-clear")) {
    return;
  }

  if (window.innerWidth > 600) {
    btn.innerText = "Очистити";
  } else {
    if (footer.querySelector("#search-input").value === "") {
      btn.innerText = "Закрити";
    } else {
      btn.innerText = "Очистити";
    }
  }
}

export function setHeightUserWindow() {
  if (!document.querySelector(".footer")) {
    return;
  }

  const wrapper = document.querySelector(".wrapper");
  const header = document.querySelector(".header");
  const content = document.querySelector(".content");
  const footer = document.querySelector(".footer");
  const windowInnerHeight = getHeightWindow();
  wrapper.style.height = windowInnerHeight + "px";
  content.style.maxHeight =
    windowInnerHeight - footer.style.height - header.style.height + "px";
}
