const fav_coffee_wrapper = document.getElementById('fav_coffee_wrapper');
const fav_coffee_block_cards = document.getElementById('fav_coffee_block_cards');
const fav_coffee_btn_back = document.getElementById('fav_coffee_btn_back');
const fav_coffee_btn_forward = document.getElementById('fav_coffee_btn_forward');
let lowerItems = document.querySelectorAll('.lower_bar_item');

// Меняю карточки при нажатии на кнопки вперед и назад
fav_coffee_btn_back.addEventListener('click', handleMoveBack);
fav_coffee_btn_forward.addEventListener('click', handleMoveForward);

let wrapperWidth = getComputedStyle(document.querySelector('.fav_coffee_wrapper')).getPropertyValue('width');
let quantityChildren = fav_coffee_block_cards.children.length;
let currentIndex = 0;
let startingPoint = new Array();

for(let i = 0; i < quantityChildren; i++){
    startingPoint.push(parseFloat(wrapperWidth) * i);
}

function handleMoveBack() {
    currentIndex = (currentIndex - 1 + quantityChildren) % quantityChildren;
    updateTransform();
    changeLowerItem();
}

function handleMoveForward() {
    currentIndex = (currentIndex + 1) % quantityChildren;
    updateTransform();
    changeLowerItem();
}

function updateTransform() {
    fav_coffee_block_cards.style.transform = `translateX(-${startingPoint[currentIndex]}px)`;
}

function changeLowerItem() {
    lowerItems.forEach((item) => {
        item.classList.remove('lower_bar_item--active');
    });

    lowerItems[currentIndex].classList.add('lower_bar_item--active');
}
