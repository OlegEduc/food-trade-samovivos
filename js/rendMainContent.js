import { products, productCategorys, anouns, arrayPlannedArrival} from "./productObject.js";
import {
  rendSidebarContent,
  rendSidebarDropdownContent,
} from "./renderSidebar.js";
import { setHeightUserWindow, widthSliderWrap } from "./ElemSizeControl.js";

import { addCounter, updateCounter, setSizeCounter } from "./CounterDown.js";
import { draw } from "./InfinitySlider.js";




setHeightUserWindow();
//наполняем sidebar контентом (группами товара)
const sidebar = document.querySelector(".sidebar");
sidebar.innerHTML = rendSidebarContent(productCategorys);
const categoryDropdown = document.querySelector(".sidebar-dropdown");
categoryDropdown.innerHTML = rendSidebarDropdownContent(productCategorys);

const sectionCart = `<div class="items counter-wrapper">
                        <div class="items__current" data-action="minus">-</div>
                        <input class="items__current" data-counter value="0">
                        <div class="items__current" data-action="plus">+</div>
                        <div class="items__current" data-action="total-sum"></div>
                        <button data-cart class="add-to-cart" data-action="addToCart">додати в кошик</button>
                     </div>`;

export function rendMainContent(prod) {
  //наполняем товарами из объекта products

  const place = document.querySelector(".content");
  const prodLevelOne = Object.values(prod);
  let sectionGood = "";
  let item;
  let productsItems;
  let category;

  if (anouns.length) {
    let anounsDiv = "";
    for (let i = 0; i < anouns.length; i++) {
      anounsDiv += `
      <p class="anouns">
        ${anouns[i]}
      </p>`;
    }
    place.innerHTML = anounsDiv;
  }

  // place.innerHTML += `<div id="promo-counter" >` + addCounter() + `</div> `;

  // place.innerHTML +=
  //   `<div id="promotion" class="promotion">
  //                       <div class="promotion-wrap">
  //                         <div class="promotion-img">
  //                           <img src="https:\/\/olegeduc.github.io\/food-trade\/image\/action\/pechivoGolskiBanner2.gif" alt="pechivoGolskiBanner">
  //                         </div> ` +
  //   addCounter() +
  //   `
  //                       </div>
  //                     </div>`;

  // infinity slider start         width: `+widthSliderWrap+`px;
  place.innerHTML +=
    `<div  id="slide-wrap" style="width: ` + widthSliderWrap + `px;">
  </div>`;
  draw();
  draw();
  // infinity slider end

  // картинка акции
  // place.innerHTML =  place.innerHTML + `<div class="grid-item-action">
  //                                            <img class="img-action" src="https://olegeduc.github.io/food-trade/image/action/action-grechka-1kg-3.jpg">
  //                                       </div> `;
  // перебираем все ключи верхнего уровня вложенности products
  for (let i = 0; i < prodLevelOne.length; i++) {
    // категория товара
    category = Object.keys(prod)[i];
    const cat = `
            <div class="category-goods" id="${category}">        		
				<h2>${category}</h2>
			</div>`;

    place.insertAdjacentHTML("beforeEnd", cat);

    productsItems = new Object(prodLevelOne[i]);

    let inStockClass = '';
    let arrival = ''
    const imgPlannedArrival = 'https://olegeduc.github.io/food-trade/labels/planned-arrival.png'   /* посилання на картинку ОЧІКУЄТЬСЯ НАДХОДЖЕННЯ */
    // const imgSoldOut = 'https://olegeduc.github.io/food-trade/labels/prodano-1.png'       /* посилання на картинку ПРОДАНО */
    const imgNew = 'https://olegeduc.github.io/food-trade/labels/new-label-01.png'  

    for (item in productsItems) {
      // содержимое категории товара
      let newLabelBlock = productsItems[item]["new-label"] != "2" ? "" : `<img class="new-label" src="${imgNew}"></img>`

      const productCode = productsItems[item]["productCode"];
      const img = productsItems[item]["imgSrc"];
      let productName = productsItems[item]["productFullName"];
      const minCountUnit = productsItems[item]["minCountUnit"];
      const unit = productsItems[item]["unit"];
      const baseUnit = productsItems[item]["baseUnit"];
      const previousPrice = productsItems[item]["previousPrice"];
      const price = productsItems[item]["price"];
      let inStock = productsItems[item]["inStock"];

      if (chbShowAllGoods.checked === true && inStock === '0') {
        /* если отображаем только товары которые есть в наличии */
        continue;
      }

      if (inStock === '0') {
        inStockClass = 'monohrom'
        if (arrayPlannedArrival.includes(productCode)) {
          console.log(productName)
          arrival = `<img class="grid-item-prodano" src="${imgPlannedArrival}">`
        } else {
          arrival = '';
        }
      } else {
        inStockClass = ''
        arrival = '';
      }
      
      sectionGood = `
				<div class="grid-item" data-productCode = ${productCode}>
        ${arrival}
        ${newLabelBlock}
					<div class="item-img-wrapper ${inStockClass}">
						<img loading="lazy" src="${img}">
					</div>
					<div class="text-goods-wrapper ${inStockClass}">
						<div class="text-goods-name">${productName} 
						<div class="text-min-qty"> від ${minCountUnit} ${baseUnit}  </div> 
          </div> `;
      /* <div class="text-min-qty ${Number(price) ? "" : " hidedElement"}"> від ${minCountUnit} ${baseUnit}  </div>  */

      if (parseFloat(previousPrice) > parseFloat(price)) {
        sectionGood += `<div class="price-block">
                        <span class="text-goods-previousPrice">${getValuePrice(previousPrice)} </span>	    
					              <span class="text-goods-price" >${getValuePrice(price, unit)}</span>   
                      </div>`;
      } else {
        sectionGood += `     
						<div class="text-goods-price" >${getValuePrice(
          price,
          unit
        )} </div>                   
        </div>`;
      }

      place.insertAdjacentHTML("beforeEnd", sectionGood);
    }

    // ищем все секции категорий и меняем в последней текст
    const catDiv = document.querySelectorAll(".category-goods");
    if (category != "focusProduct") {
      catDiv[
        catDiv.length - 1
      ].innerHTML = `<h2>${productsItems[item]["category"]}</h2>`;
    } else {
      catDiv[catDiv.length - 1].innerHTML = "";
    }
  }
}

export function getValuePrice(el, baseUnit, sect) {
  let elOfFloat = Number(el);

  if (elOfFloat) {
    return `&#8372 ${parseFloat(el).toFixed(2)} <span> ${baseUnit ? baseUnit : ""
      }</span>`;
  } else {
    return "<span style='width: 100%; text-align: center; font-size: small;' >Ціна за домовленістю</span>";
  }
}



const chbShowAllGoods = document.querySelector('#inputShowAllGoods');

chbShowAllGoods.addEventListener('click', () => {
  const place = document.querySelector(".content");
  place.innerHTML = ''

  rendMainContent(products);

})

rendMainContent(products);
