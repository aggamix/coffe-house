import { currentArray } from "./menu.js";

let body = document.getElementById("body");
let modalWindow = document.getElementsByClassName("modal_section");
let modalSection = document.getElementById("modal");
let modalInvisibleChild = document.getElementById("modalInvisibleChild");
let menuCards = document.getElementById("menu_section").childNodes;
let modalTotalPrice = document.getElementById("modalTotalPrice");
let modalBtnClose = document.getElementById("modalBtnClose");
let buttonsMenuBar = document.querySelectorAll(".menu_btn");
let modalButtonsSize = document.getElementById('modalButtonsSize').querySelectorAll('.modalBtn');
let modalButtonsAdditives = document.getElementById('modalButtonsAdditives').querySelectorAll('.modalBtn');

//Меняю-добавляю активный класс для кнопок
modalButtonsSize.forEach((item) => {
    item.addEventListener('click', changeSizeProduct);
});

function changeSizeProduct() {
    modalButtonsSize.forEach((item) => {
        item.classList.remove("modalBtn--active");
        item.childNodes[1].classList.remove("modalBtn_option--active");
        item.childNodes[3].classList.remove("modalBtn_text--active");
    });
    
    this.classList.add("modalBtn--active");
    this.childNodes[1].classList.add("modalBtn_option--active");
    this.childNodes[3].classList.add("modalBtn_text--active");
} 

modalButtonsAdditives.forEach((item) => {
    item.addEventListener('click', changeAdditivesProduct);
});

function changeAdditivesProduct() {
    this.classList.toggle("modalBtn--active");
    this.childNodes[1].classList.toggle("modalBtn_option--active");
    this.childNodes[3].classList.toggle("modalBtn_text--active");
}

//При нажатии на кнопку получаю актуальные карточки для модального окна
buttonsMenuBar.forEach((item) => {
  item.addEventListener("click", getCurrentMenuSection);
});

function getCurrentMenuSection() {
  menuCards = document.getElementById("menu_section").childNodes;
  addListenerForCards();
}

//Вешаю событие на каждую карточку, буду открывать модальное окно при нажатии на карточку
let currentCardImg;
let currentCardName;
let currentCardDescription;
let currentCardPrice;

function addListenerForCards() {
  menuCards.forEach((item) => {
    item.addEventListener("click", handleAppearModal);
  });
}

addListenerForCards();

modalBtnClose.addEventListener("click", closeModal);
modalInvisibleChild.addEventListener("click", closeModal);

function closeModal() {
  modalSection.style.display = "none";
  body.style.overflow = "";
}

function handleAppearModal() {
  let left = document.documentElement.scrollLeft;
  let top = document.documentElement.scrollTop;
  let childrenItem = this.childNodes;
  currentCardImg = childrenItem[0].childNodes[0];
  currentCardName = childrenItem[1].childNodes[0].childNodes[0].textContent;
  currentCardDescription =
    childrenItem[1].childNodes[0].childNodes[1].textContent;
  currentCardPrice = parseFloat(
    childrenItem[1].childNodes[1].textContent.replace("$", "")
  ).toFixed(2);

  body.style.overflow = "hidden";
  modalWindow[0].style.top = top + "px";
  modalWindow[0].style.left = left + "px";
  modalWindow[0].style.display = "flex";

  modalWindow[0].childNodes[1].childNodes[1].innerHTML =
    currentCardImg.outerHTML;
  modalWindow[0].childNodes[1].childNodes[3].childNodes[1].childNodes[1].textContent =
    currentCardName;
  modalWindow[0].childNodes[1].childNodes[3].childNodes[1].childNodes[3].textContent =
    currentCardDescription;
  modalWindow[0].childNodes[1].childNodes[3].childNodes[7].childNodes[3].textContent = `$ ${currentCardPrice}`;
}
