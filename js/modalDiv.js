import { products, productCategorys } from "./productObject.js";
import { getValuePrice } from "./rendMainContent.js";


window.addEventListener("click", function (event) {
  let curentEl;

  const modalWrapper = this.document.querySelector(".modal-wrapper");
  if (findAncestor(event.target, "grid-item")) {
    curentEl = findAncestor(event.target, "grid-item");

    const img = getElement(curentEl.dataset.productcode, products)["imgSrc"];
    const price = getElement(curentEl.dataset.productcode, products)["price"];
    const previousPrice = getElement(curentEl.dataset.productcode, products)["previousPrice"];
    const productName = getElement(curentEl.dataset.productcode, products)[
      "productFullName"
    ];
    const inStock = getElement(curentEl.dataset.productcode, products)[
      "inStock"
    ];

    const minCountUnit = getElement(curentEl.dataset.productcode, products)[
      "minCountUnit"
    ];
    const unit = getElement(curentEl.dataset.productcode, products)["unit"];
    const baseUnit = getElement(curentEl.dataset.productcode, products)["baseUnit"];
    const productCode = getElement(curentEl.dataset.productcode, products)["productCode"];

    modalWrapper.classList.toggle("open");
    this.getComputedStyle(modalWrapper);
    modalWrapper.innerHTML = `
    <div class="modal">		
    <button class="modal-btn-close">X</button>
         <img src="${img}" class='modal-img'>
         <div class="text-goods-name">${productName} <br>
         <span class="code-gods">код: ${productCode.padStart(5, '0')}<span><br>
         <span class="text-min-qty">*ціна діє при купівлі від ${minCountUnit} ${baseUnit} </span> </div> 
         <span class="text-goods-previousPrice">
         ${(previousPrice > price) && (inStock === '1') ? textPrice(inStock, previousPrice, baseUnit) : ""} </span>	  
         
         <div class="text-goods-price">
         ${textPrice(inStock, price, baseUnit) } 
         </div>	
    </div>
  `;
  }

  if (
    event.target.classList.contains("modal-img") ||
    event.target.classList.contains("modal-btn-close") ||
    event.target.classList.contains("modal-wrapper") ||
    event.target.parentElement.classList.contains("modal-wrapper")
  ) {
    modalWrapper.classList.toggle("open");
  }
});


const textPrice = (inStock, price, baseUnit) => {   // возвращает текст для секции цены 
  if (inStock === '1') {
    return getValuePrice(price, baseUnit)
  } else {
    return `Товар відсутній`
  }
}

function findAncestor(el, cls) {   // находит предка элемента с указанным классом
  while ((el = el.parentElement) && !el.classList.contains(cls)) { }
  return el;
}

function getElement(elemId, whereAreWeLooking) {
  for (let key in whereAreWeLooking) {
    for (let el in whereAreWeLooking[key]) {
      if (elemId == whereAreWeLooking[key][el]["productCode"]) {
        return whereAreWeLooking[key][el];
        break;
      }
    }
  }
}
