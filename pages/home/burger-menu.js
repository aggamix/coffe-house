const body = document.getElementById('body');
const header_menu_wrapper = document.getElementById('header_menu_wrapper');
const burgerMenu = document.getElementById('burger_menu');
const burger_content = document.getElementById('burger_content');
const burger_line1 = document.getElementById('burger_line1');
const burger_line2 = document.getElementById('burger_line2');
const header_menu_mobile = document.getElementById('header_menu_mobile');
const nav_bar_link = document.querySelectorAll('.nav_bar-link');

let stateBurgerMenu = false;

window.addEventListener('resize', () => {
    window.innerWidth > 768 ? disappearCross(disappearMenu) : false;
});

nav_bar_link.forEach(function(item){
    item.addEventListener('click', () => disappearCross(disappearMenu));
});

burgerMenu.addEventListener('click', () => {
    stateBurgerMenu === false ? appearCross(appearMenu) : disappearCross(disappearMenu);
});

function appearCross(callback) {
    stateBurgerMenu = true;
    body.style.overflow = 'hidden';
    burger_line1.style.transform = 'rotate(45deg)';
    burger_line1.style.position = 'absolute';
    burger_line1.style.transition = 'all 0.7s ease-in';
    burger_line2.style.transform = 'rotate(-45deg)';
    burger_line2.style.position = 'absolute';
    burger_line2.style.transition = 'all 0.4s ease-in';
    return callback();
}

function disappearCross(callback) {
    stateBurgerMenu = false;
    body.style.overflow = '';
    burger_line1.style.transform = 'rotate(0deg)';
    burger_line1.style.position = 'static';
    burger_line1.style.transition = 'all 0.4s ease-in-out';
    burger_line2.style.transform = 'rotate(0deg)';
    burger_line2.style.position = 'static';
    burger_line2.style.transition = 'all 0.7s ease-in-out';
    return callback();
}

function appearMenu() {
    header_menu_mobile.style.display = 'flex';
    header_menu_mobile.style.animationName = 'open-menu';
}

function disappearMenu() {
    setTimeout(() => {
        header_menu_mobile.style.display = 'none';
    }, 600);    
    header_menu_mobile.style.animationName = 'close-menu';
}