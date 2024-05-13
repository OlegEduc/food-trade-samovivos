import { products, productCategorys } from "./productObject.js";
import {
  rendSidebarContent,
  rendSidebarDropdownContent,
} from "./renderSidebar.js";
import { setHeightUserWindow } from "./ElemSizeControl.js";

//setHeightUserWindow();

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
      // содержимое категории товара
      const productCode= productsItems[item]["productCode"];
      const img = productsItems[item]["imgSrc"];
      const productName = productsItems[item]["productFullName"];
      const minCountUnit = productsItems[item]["minCountUnit"];
      const previousPrice = parseFloat(
        productsItems[item]["previousPrice"]
      ).toFixed(2);
      const price = parseFloat(productsItems[item]["price"]).toFixed(2);
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
        sectionGood += `<div class="text-goods-previousPrice"><h3>${previousPrice} &#8372</h3></div>      
					    <div class="text-goods-price">${price} &#8372</div>	
            </div>`;
      } else {
        sectionGood += `     
						<div class="text-goods-price">${price} &#8372 </div>                   
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

rendMainContent(products);

// window.addEventListener("click", function (event) {
//   // если текстовое поле поиска не пустое то при клике на каком-либо элементе группы товаров
//   // очистим текстовое поле поиска и выведем товары выбранной группы товаров
//   if (event.target.closest(".sidebar-item")) {
//     document.querySelector(".content").innerText = "";
//     const searchInput = this.document.querySelector("#search-input");
//     const sidebar = this.document.querySelector(".sidebar");
//     const sidebarDropdown = this.document.querySelector(".sidebar-dropdown");
//     if (sidebarDropdown != null) {
//       sidebarDropdown.style.cssText += "display: none";
//     }
//     rendMainContent(products);
//   }
// });
