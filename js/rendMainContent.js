import { products, productCategorys, anouns } from "./productObject.js";
import {
  rendSidebarContent,
  rendSidebarDropdownContent,
} from "./renderSidebar.js";
import { setHeightUserWindow } from "./ElemSizeControl.js";

setHeightUserWindow()
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

  // проверим есть ли какие-то сообщения (массив anouns)для отображения
  // если ДА тогда сформируем вывод

  if (anouns.length ) {
    let anounsDiv =  '';
    for (let i = 0; i <= anouns.length - 1; i++) {
      console.log(anouns[i]);
      anounsDiv =  `<div class="anouns">
        ${anouns[i]}
       </div>`
       place.innerHTML = anounsDiv;
    }    
  }

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

    for (item in productsItems) {
      let currencySign = '';
      // содержимое категории товара
      const productCode = productsItems[item]["productCode"];
      const img = productsItems[item]["imgSrc"];
      const productName = productsItems[item]["productFullName"];
      const minCountUnit = productsItems[item]["minCountUnit"];
      const previousPrice = productsItems[item]["previousPrice"];
      const price = productsItems[item]["price"];

      if (parseInt(price) != 0) {
        const previousPrice = parseFloat(productsItems[item]["previousPrice"]).toFixed(2);
        const price = parseFloat(productsItems[item]["price"]).toFixed(2);
        currencySign = '&#8372';
      }


      //console.log(currencySign);
      const unit = productsItems[item]["unit"];

      sectionGood = `
				<div class="grid-item" data-productCode = ${productCode}>
					<div class="item-img-wrapper">
						<img src="image/${img}">
					</div>
					<div class="text-goods-wrapper">
						<div class="text-goods-name">${productName} <br>
						<div class="text-min-qty"> від ${minCountUnit} ${unit}  </div> 
          </div> `;

      if (previousPrice > price) {
        sectionGood += `<div class="text-goods-previousPrice"><h3>${previousPrice} ${currencySign}</h3></div>      
					    <div class="text-goods-price">${price} ${currencySign}</div>	
            </div>`;
      } else {
        sectionGood += `     
						<div class="text-goods-price">${price} ${currencySign} </div>                   
            </div>`;
      }
      currencySign = '+';
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

rendMainContent(products);

