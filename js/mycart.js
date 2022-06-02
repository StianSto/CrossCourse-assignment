import {products} from '/js/components/products.js';
import {updateCartCount} from '/js/script.js';

const myCartForm = document.querySelector("form")
const cartProductContainer = document.querySelector(".products_cart_flex");

let cartItems = [];
cartItems = JSON.parse(localStorage.getItem('shoppingCart'));


// check if there are products in cart and make cartpage
function checkIfProductsExist() {
if (cartItems.length === 0) {
    myCartForm.innerHTML = "<h3>no products selected</h3>";
    
    } else {
    makeCartPage();

    const productsCheckIsGood = document.querySelector('[data-headercollapse="1"] .fa');
    productsCheckIsGood.classList.add("fa-check")
    }
}
checkIfProductsExist()

function makeCartPage() {
    
    let productlist = "";
    let arrayIndex = -1;
    let html = "";

    cartItems.forEach(item => {
        arrayIndex++
        html += `
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
    })

    cartProductContainer.innerHTML = html
    let continueBtn = document.createElement("div")
    continueBtn.innerHTML = `<div class="cta cta--alt" data-next-collapse="1">Continue</div>`
    cartProductContainer.append(continueBtn);

    const removeItem = document.querySelectorAll(".remove-item");
    removeItem.forEach(remove => {
        remove.addEventListener("click", removeItemFromCart)
    })
}

// remove items and update arrays, storage and page
function removeItemFromCart(e) {
    if(!cartItems.length > 1) {cartItems = []}
    const dataProduct = e.target.dataset.product
    cartItems.splice(dataProduct, 1)

    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    cartProductContainer.innerHTML = "";
    makeCartPage();
    updateCartCount();
    cartSummary();
    checkIfProductsExist();
}

function cartSummary() {

    if(!cartItems) {return}

    const summary = document.querySelector(".summary_mycart")
    const sumTotalPrice = document.querySelector(".sum_total_price")

    let total = 0;
    let html = "";
    cartItems.forEach(item => {
        let itemPrice = parseFloat(item.price)
        total += itemPrice;
        html += `<p>1 x ${item.brandName} - ${item.productName}</p>`
    });
    summary.innerHTML = html
    sumTotalPrice.innerHTML = `Total: $${total}`
}
cartSummary();


const headerCollapseable = document.querySelectorAll('[data-headercollapse]');
const collapseable = document.querySelectorAll('[data-collapse]');
const nextCollapseableBtn = document.querySelectorAll("[data-next-collapse]");

nextCollapseableBtn.forEach(btn => {
    btn.addEventListener("click", nextForm);
})

headerCollapseable.forEach(i => {
    i.addEventListener("click", openFieldset);
})

// continue to next fieldset
function nextForm(e) {
    console.log(e)
    let targetCollapseDataId = parseFloat(e.target.dataset.nextCollapse) + 1;

    collapseable.forEach(i => {
        const parsedId = parseFloat(i.dataset.collapse);
        if(parsedId === targetCollapseDataId) {
            i.classList.remove("collapse--box")
        } else {
            i.classList.add("collapse--box")
        }
    }) 
}

// opne fieldset when header is clicked
function openFieldset(e) {
    let targetCollapseDataId = parseFloat(e.target.dataset.headercollapse);

    collapseable.forEach(i => {
        const parsedId = parseFloat(i.dataset.collapse);

        if(parsedId === targetCollapseDataId) {
            i.classList.remove("collapse--box");
        } else {
            i.classList.add("collapse--box");
        }
    }) 
}


// form validations
const sameAsAddress = document.querySelector("#same_as_adress");
const deliveryAddress = document.querySelector("#delivery-adress");
const deliveryCity = document.querySelector("#delivery-city");
const deliveryPostalCode = document.querySelector("#delivery-postal_code");

let useAddressInfoForDelivery = false;

sameAsAddress.addEventListener("click", sameAsAddressChecked)
function sameAsAddressChecked() {
    if (sameAsAddress.checked === true) {
        deliveryAddress.disabled = true;
        deliveryCity.disabled = true;
        deliveryPostalCode.disabled = true;
        useAddressInfoForDelivery = true;
    } else {
        deliveryAddress.disabled = false;
        deliveryCity.disabled = false;
        deliveryPostalCode.disabled = false;
        useAddressInfoForDelivery = false;
    }
}