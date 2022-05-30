const navMenuBtn = document.querySelector(".hamburger-menu_header");
const menuBars = document.querySelectorAll(".bar");
const navMenu = document.querySelector("#primary-nav");
const header = document.querySelector("header");

navMenuBtn.addEventListener("click", () => {
    const navIsVisible = navMenu.getAttribute("data-visible");
    navMenu.classList.add("animate-nav")

    menuBars.forEach(bar => {
        bar.classList.toggle("close")
    });

    if(navIsVisible === "false") {
        navMenu.setAttribute("data-visible", true);
        navMenu.setAttribute("aria-expanded", true);
    } else {
        navMenu.setAttribute("data-visible", false);
        navMenu.setAttribute("aria-expanded", false);
    }

    navMenu.addEventListener('transitionend', () => {
        navMenu.classList.remove("animate-nav");
    })
});


// this code is inpsired by w3schools : https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > "120") {
        if (prevScrollpos > currentScrollPos) {
            header.style.top = "0";
        } else {
            header.style.top = "-100%";
        }
    }
    prevScrollpos = currentScrollPos;
}


const addToCartBtn = document.querySelector(".add-to-cart");
addToCartBtn.addEventListener("click", addedToCart);

function addedToCart() {
    const addToCartModal = document.createElement("div");
    addToCartModal.classList.add("add-to-cart__modal");
    addToCartModal.innerHTML = `
        <img src="/Assets/images/product_1.jpg" alt="">
        <div class="add-to-cart__modal--text">
            <p>Item has been added to your cart</p>
            <button class="cta"><a href="/mycart.html">go to cart</a></button>
        </div>
    `
    const contentWrapper = document.querySelector(".content_wrapper");
    contentWrapper.appendChild(addToCartModal);

    setTimeout(() => {
        addToCartModal.style.transform = "translateX(0)"

        setTimeout(() => {
            addToCartModal.style.transform = "translateX(200%)"

            setTimeout(() => {
                addToCartModal.remove();
            }, 5001);
        }, 5000);
    }, 1);
}

