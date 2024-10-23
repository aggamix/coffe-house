import { productsObj } from "./products.js";
let buttonsMenuBar = document.querySelectorAll(".menu_btn");
let defaultCoffeBtn = document.getElementById("coffee_btn");
let menuSection = document.getElementById("menu_section");
let btnRefresh = document.getElementById('menu_btn_refresh');

//Достаю из моего общего файла каждый вид продукта
export let coffeArray = new Array();
export let teaArray = new Array();
export let dessertArray = new Array();
productsObj.forEach(() => {
  coffeArray = productsObj.filter((item) => item.category === "coffee");
  teaArray = productsObj.filter((item) => item.category === "tea");
  dessertArray = productsObj.filter((item) => item.category === "dessert");
});

//Создаю объект, в котором поля соответствуют ID кнопок, а свойства - массивы для каждого ID
export let collectionId= {
    'coffee_btn': coffeArray,
    'tea_btn': teaArray,
    'dessert_btn': dessertArray
};

//Проверка ширины экрана, также добавляем-удаляем кнопку refresh, в запвисимости от  ширины экрана
let windowWidth;
function handleWindowResize() {
    windowWidth = window.innerWidth;
    if(windowWidth > 768){
      btnRefresh.style.display = 'none';
    }
    if(!(windowWidth > 768)){
      btnRefresh.style.display = 'flex';
    }
}

window.addEventListener('resize', handleWindowResize);

//При нажатии на кнопку refresh, показываю остальные карточки
btnRefresh.addEventListener('click', handleAppearCards);
let hidenItems;
function handleAppearCards() {
  hidenItems = document.querySelectorAll('.menu_section li:nth-child(n + 5)');
  hidenItems.forEach((item) => {
    item.style.display = (item.style.display === 'none' || item.style.display === '') ? 'flex' : 'none';
  });
  btnRefresh.style.display = 'none';
}

//Добавление и удаление стилей для кнопок при нажатии
buttonsMenuBar.forEach((button) => {
  button.addEventListener("click", changeProducts);
});

export let currentId;
export let currentArray;

function changeProducts() {
  buttonsMenuBar.forEach((item) => {
    item.classList.remove("menu_btn--active");
    item.childNodes[1].classList.remove("menu_btn_img--active");
  });

  this.classList.add("menu_btn--active");
  this.childNodes[1].classList.add("menu_btn_img--active");

  windowWidth >= 768 ? btnRefresh.style.display = 'none': btnRefresh.style.display = 'flex';

  currentId = this.id;
  currentArray = collectionId[currentId];
  menuSection.textContent = '';
  createElements(currentArray);
}

//Добавляю начальную разметку на страницу
function addDefaultProducts() {
  defaultCoffeBtn.classList.add("menu_btn--active");
  defaultCoffeBtn.childNodes[1].classList.add("menu_btn_img--active");
  createElements(coffeArray);
}

addDefaultProducts();

//Функция для создания каждой карточки
function createElements(arr) {
  if(windowWidth <= 768) btnRefresh.style.display = 'flex';
  if(arr.length <= 4) btnRefresh.style.display = 'none';

  for (let i = 0; i < arr.length; i++) {
    let product = document.createElement("li");
    product.classList.add("menu_section_card");
    product.setAttribute('id', `menuCard${i + 1}`);

    let productImg = document.createElement("div");
    productImg.classList.add("menu_section_card_img");

    let img = document.createElement("img");
    img.src = arr[i].image;
    img.alt = arr[i].category;

    productImg.appendChild(img);
    product.appendChild(productImg);

    let productInfo = document.createElement("div");
    productInfo.classList.add("menu_section_card_info");

    let productText = document.createElement("ul");
    productText.classList.add("menu_section_card_text");

    let titleProduct = document.createElement("li");
    titleProduct.classList.add("menu_section_card_title");
    titleProduct.textContent = arr[i].name;

    let descriptProduct = document.createElement("li");
    descriptProduct.classList.add("menu_section_card_description");
    descriptProduct.textContent = arr[i].description;

    productText.appendChild(titleProduct);
    productText.appendChild(descriptProduct);

    productInfo.appendChild(productText);

    let priceProduct = document.createElement("span");
    priceProduct.classList.add("menu_section_card_title");
    priceProduct.textContent = `$ ${arr[i].price}`;

    productInfo.appendChild(priceProduct);
    product.appendChild(productInfo);

    menuSection.appendChild(product);
  }
}