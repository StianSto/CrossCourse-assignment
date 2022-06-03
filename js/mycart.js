import {products} from '/js/components/products.js';
import {updateCartCount} from '/js/script.js';

const myCartForm = document.querySelector("form");
myCartForm.onsubmit = function(e) {
    e.preventDefault();

    if(!validateAddressInfo() || !validateDeliveryInfo() || !validatePayment()) return;


    localStorage.removeItem('shoppingCart')

    window.location.replace("../checkout_success.html");
};

const cartProductContainer = document.querySelector(".products_cart_flex");

let cartItems = [];
cartItems = JSON.parse(localStorage.getItem('shoppingCart'));


// check if there are products in cart and make cartpage
function checkIfProductsExist() {
if (cartItems.length === 0 || !cartItems) {
    myCartForm.innerHTML = '<h3>no products selected</h3>';
    
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

    let targetCollapseDataId = parseFloat(e.target.dataset.nextCollapse) + 1;

    collapseable.forEach(i => {
        const parsedId = parseFloat(i.dataset.collapse);

        if(parsedId === 2 && i.dataset.hasopened) {validateAddressInfo();}
        if(parsedId === 3 && i.dataset.hasopened) {validateDeliveryInfo();}
        if(parsedId === 4 && i.dataset.hasopened) {validatePayment();}

        if(parsedId === targetCollapseDataId) {
            i.classList.remove("collapse--box")
            i.setAttribute('data-hasopened', true);
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

        if(parsedId === 2 && i.dataset.hasopened) {validateAddressInfo();}
        if(parsedId === 3 && i.dataset.hasopened) {validateDeliveryInfo();}
        if(parsedId === 4 && i.dataset.hasopened) {validatePayment();}

        if(parsedId === targetCollapseDataId) {
            i.classList.remove("collapse--box");
            i.setAttribute('data-hasopened', true);
        } else {
            i.classList.add("collapse--box");
        }
    }) 
}


// form validations
const firstName = document.querySelector("#first_name");
const lastName = document.querySelector("#last_name");
const address = document.querySelector("#adress");
const city = document.querySelector("#city");
const postalCode = document.querySelector("#postal_code");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");

let customerAddressInfo = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
    phone: ""
} 



// validate Address Info
const regexNumbersOnly = /^[0-9]+$/;
const regexEmail = /\S+@\S+\.\S+/;

function validateAddressInfo() {

    let inputIsValid = true;

    function validateInputExists(input) {
        if(!input.value.length > 0) {
            inputIsValid = false;
            input.classList.add("inputValidationError");
        }
    }
    function validateInputNumbersOnly(input) {
        if(!regexNumbersOnly.test(input.value)) {
            inputIsValid = false;
            input.classList.add("inputValidationError");
        }
    }
    function validateInputEmail(input) {
        if(!regexEmail.test(input.value)) {
            inputIsValid = false;
            input.classList.add("inputValidationError");
        }
    }

    firstName.classList.remove("inputValidationError");
    lastName.classList.remove("inputValidationError");
    address.classList.remove("inputValidationError");
    city.classList.remove("inputValidationError");
    postalCode.classList.remove("inputValidationError");
    email.classList.remove("inputValidationError");
    phone.classList.remove("inputValidationError");

    validateInputExists(firstName);
    validateInputExists(lastName);
    validateInputExists(address);
    validateInputExists(city);
    validateInputExists(postalCode);
    validateInputNumbersOnly(postalCode);
    validateInputEmail(email)
    validateInputNumbersOnly(phone);

    firstName.addEventListener("blur", validateAddressInfo)
    lastName.addEventListener("blur", validateAddressInfo)
    address.addEventListener("blur", validateAddressInfo)
    city.addEventListener("blur", validateAddressInfo)
    postalCode.addEventListener("blur", validateAddressInfo)
    email.addEventListener("blur", validateAddressInfo)
    phone.addEventListener("blur", validateAddressInfo)

    if (inputIsValid) {
        const addressIsGood = document.querySelector('[data-headercollapse="2"] .fa');
        addressIsGood.classList.add("fa-check")
        return true;
    }
    return false;
}

// validate Delivery Info

const sameAsAddress = document.querySelector("#same_as_adress");
sameAsAddress.addEventListener("click", sameAsAddressChecked);
const deliveryAddress = document.querySelector("#delivery-adress");
const deliveryCity = document.querySelector("#delivery-city");
const deliveryPostalCode = document.querySelector("#delivery-postal_code");

let useAddressInfoForDelivery = false;
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
    validateDeliveryInfo();
}

function validateDeliveryInfo() {
    let deliveryInputIsValid = true;
    const addressIsGood = document.querySelector('[data-headercollapse="3"] .fa');
    addressIsGood.classList.remove("fa-check");

    deliveryAddress.classList.remove("inputValidationError");
    deliveryCity.classList.remove("inputValidationError");
    deliveryPostalCode.classList.remove("inputValidationError");

    deliveryAddress.addEventListener("blur", validateDeliveryInfo);
    deliveryCity.addEventListener("blur", validateDeliveryInfo);
    deliveryPostalCode.addEventListener("blur", validateDeliveryInfo);

    function validateInputExists(input) {
        if(!input.value.length > 0) {
            deliveryInputIsValid = false;
            input.classList.add("inputValidationError");
        }
    }
    function validateInputNumbersOnly(input) {
        if(!regexNumbersOnly.test(input.value)) {
            deliveryInputIsValid = false;
            input.classList.add("inputValidationError");
        }
    }

    if(!useAddressInfoForDelivery) {
        validateInputExists(deliveryAddress);
        validateInputExists(deliveryCity);
        validateInputNumbersOnly(deliveryPostalCode);
    } else {
        deliveryInputIsValid = useAddressInfoForDelivery;
    }
    
    if(deliveryInputIsValid) {
        addressIsGood.classList.add("fa-check");
        return true;
    } return false;
}


//  validate payment 
const paymentOptions = document.querySelectorAll("[type='radio']");
paymentOptions.forEach(e => {e.addEventListener("click", validatePayment)})

function validatePayment(){
    let paymentSelected = false;
    paymentOptions.forEach(option => {
        if(option.checked) {
            paymentSelected = true;
        }
    })
    if(paymentSelected) {
        const paymentIsGood = document.querySelector('[data-headercollapse="4"] .fa');
        paymentIsGood.classList.add("fa-check");
        return true;
    } return false
}