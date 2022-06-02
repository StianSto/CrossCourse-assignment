import {products} from '/js/components/products.js';
import {updateCartCount} from '/js/script.js';

const cartProductContainer = document.querySelector(".products_cart_flex");
const cartItems = JSON.parse(localStorage.getItem('shoppingCart'));



function makeCartPage() {
    // totalprice
    let total = 0;
    cartItems.forEach(item => {
        let itemPrice = parseFloat(item.price)
        total = total + itemPrice;
    });
    
    let arrayIndex = -1;
    // add products to container

    cartItems.forEach(item => {
        arrayIndex++
        cartProductContainer.innerHTML += `
        <div class="products_cart">
            <img src="${item.img}" alt="${item.altDescr}}">
            <div class="products_cart_info">
                <h3>${item.brandName} ${item.productName}</h3>
                <p><span class="item-count">x 1</span></p>
                <p class="item-price">$ ${item.price}</p>
            </div>
            <span class="remove-item" data-product="${arrayIndex}">remove</span>
        </div>
        `

    const removeItem = document.querySelectorAll(".remove-item");


    removeItem.forEach(remove => {
        remove.addEventListener("click", removeItemFromCart)
    })
    })
}
makeCartPage();

function removeItemFromCart(e) {
    const dataProduct = e.target.dataset.product
    const productToRemove = products.find((product => product.id === dataProduct));
    cartItems.splice(dataProduct, 1)

    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    cartProductContainer.innerHTML = ""
    makeCartPage();
    updateCartCount();
}