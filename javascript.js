// This is my first script ;)

const textUp = document.querySelector('#text-up'); // find by id
const textCategory = document.querySelector('#text-category');
const textCall = document.querySelector('#text-call');

textBtnNav()
// отслеживает изменеие ширины или высоты экрана 
window.addEventListener('resize', () => {
    textBtnNav();
});


function textBtnNav() {
    if (window.innerWidth > 590) {
        textUp.innerText = 'На початок';
        textUp.style.cssText += 'min-height: 20%; color: yellow;';
        textCategory.innerText = 'Категорії';
        textCategory.style.cssText += 'font-size: x-large';
        textCall.innerText = 'Контакти';
        textCall.style.cssText += ' min-height: 20%; color: yellow; font-size: x-large';
    } else {
        textUp.innerText = '^';
        textUp.style.cssText += ' border-radius: 50%; font-weight: 0';
        textCategory.innerHTML = '<img src="image/menu_burger_icon.png" alt="menu_burger_icon" >';
        textCall.innerHTML = '<img src="image/telephone-icons.png" alt="telephone-icons" >';
    }
}
