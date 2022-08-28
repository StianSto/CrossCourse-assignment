import {updateCartCount} from '/js/script.js';

const myCartForm = document.querySelector("form");
const cartProductContainer = document.querySelector(".products_cart_flex");
let cartItems = [];
cartItems = JSON.parse(localStorage.getItem('shoppingCart'));

console.log(cartItems)

myCartForm.onsubmit = function(e) {
    e.preventDefault();

    if(!validateAddressInfo() || !validateDeliveryInfo() || !validatePayment()) return;

    localStorage.removeItem('shoppingCart')
    window.location.replace("../checkout_success.html");
};

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


// make html for My Cart page
function makeCartPage() {
    
    let arrayIndex = -1;
    let html = "";

    cartItems.forEach(item => {
        arrayIndex++
        html += `
        <div class="products_cart">
            <img src="${item.images[0].src}" alt="${item.images[0].alt}}">
            <div class="products_cart_info">
                <h3>${item.name}</h3>
                <p><span class="item-count">x 1</span></p>
                <p class="item-price">$ ${item.prices.price / 100}</p>
            </div>
            <span class="remove-item" data-product="${arrayIndex}"><i class="fa fa-solid fa-trash" style="margin-right: 8px;" ></i>remove</span>
        </div>
        `  
    })

    cartProductContainer.innerHTML = html
    let continueBtn = document.createElement("div")
    continueBtn.innerHTML = `<div class="cta cta--alt continue" data-next-collapse="1">Continue</div>`;
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


// open fieldset when header is clicked
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

let validateInputsAddressInfoExist = [firstName, lastName, address, city, postalCode, email, phone];
let validateInputsAddressInfoNumbers = [postalCode, phone];

// validate Address Info
const regexNumbersOnly = /^[0-9]+$/;
const regexEmail = /\S+@\S+\.\S+/;


function validateAddressInfo() {

    const addressIsGood = document.querySelector('[data-headercollapse="2"] .fa');
    let inputIsValid = true;

    function validateInputExists(input) {
        let testIfExists = input.value.length > 0;
        if (!testIfExists) inputIsValid = false
        let msg = "* required";
        displayErrMsg(input, msg, inputIsValid, testIfExists);
    }

    function validateInputNumbersOnly(input) {
        let testIfNumbersOnly = regexNumbersOnly.test(input.value);
        if (!testIfNumbersOnly) inputIsValid = false
        let msg = "* use numbers only";
        displayErrMsg(input, msg, inputIsValid, testIfNumbersOnly);
    }

    function validateInputEmail(input) {
        let testIfEmailValid = regexEmail.test(input.value);
        if (!testIfEmailValid) inputIsValid = false
        let msg = '* please enter a valid email: "john@mail.com"';
        displayErrMsg(input, msg, inputIsValid, regexEmail.test(input.value));
    }

    validateInputsAddressInfoExist.forEach(i => {
        i.classList.remove("inputValidationError");
        validateInputExists(i);
        i.addEventListener("blur", validateAddressInfo);
    });

    validateInputsAddressInfoNumbers.forEach(i => {
        i.classList.remove("inputValidationError");
        validateInputNumbersOnly(i);
        i.addEventListener("blur", validateAddressInfo);
    })

    validateInputEmail(email)

    if (inputIsValid) {
        addressIsGood.classList.add("fa-check");
        cartSummary();
        return true;
    } else {
        addressIsGood.classList.remove("fa-check");
        return false;
    }
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
        let testIfExists = input.value.length > 0;
        if(!testIfExists) deliveryInputIsValid = false;
        let msg = "* enter a value";
        displayErrMsg(input, msg, deliveryInputIsValid, testIfExists);
    }
    function validateInputNumbersOnly(input) {

        let testIfNumbersOnly = regexNumbersOnly.test(input.value);
        if(!testIfNumbersOnly) deliveryInputIsValid = false;
        let msg = "* enter numbers only";
        displayErrMsg(input, msg, deliveryInputIsValid, testIfNumbersOnly);
    }

    if(!useAddressInfoForDelivery) {
        validateInputExists(deliveryAddress);
        validateInputExists(deliveryCity);
        validateInputExists(deliveryPostalCode);
        validateInputNumbersOnly(deliveryPostalCode);
    } else {
        deliveryInputIsValid = useAddressInfoForDelivery;
    }
    
    if(deliveryInputIsValid) {
        addressIsGood.classList.add("fa-check");
        cartSummary();
        return true;
    } 
    addressIsGood.classList.remove("fa-check");
    return false;
}

//  validate payment 
const paymentOptions = document.querySelectorAll("[type='radio']");
paymentOptions.forEach(e => {e.addEventListener("click", validatePayment)});

function validatePayment(){
    let paymentSelected = false;
    cartSummary();
    paymentOptions.forEach(option => {
        if(option.checked) {
            paymentSelected = true;
        }
    })
    if(paymentSelected) {
        cartSummary();
        const paymentIsGood = document.querySelector('[data-headercollapse="4"] .fa');
        paymentIsGood.classList.add("fa-check");
        return true;
    } return false
}

function displayErrMsg(input, msg, inputIsValid, validityTest) {
    let inputSibling = input.nextElementSibling;
    if(!validityTest) {
        inputIsValid = false;
        input.classList.add("inputValidationError");      

        let errMsg = document.createElement("span");
        errMsg.classList.add("err-msg");
        errMsg.innerText = msg;

        if(!inputSibling) {
            input.after(errMsg);
        }

    } else {
        if(inputSibling) {
            input.parentNode.removeChild(inputSibling);

        }
    }
}

function cartSummary() {

    if(!cartItems) {return}

    const summary = document.querySelector(".summary_mycart")
    const sumTotalPrice = document.querySelector(".sum_total_price")

    let total = 0;
    let html = "";

    let htmlProducts = "<h4>Products</h4>"
    cartItems.forEach(item => {

        let itemPrice = parseFloat(item.prices.price / 100)
        total += itemPrice;
        htmlProducts += `<p>1 x ${item.name}</p>`;
        
    });

    html += htmlProducts;
    let htmlDeliveryInfo = "";

    if(useAddressInfoForDelivery) {
        htmlDeliveryInfo = `
        <div>
            <h4>Delivery</h4>
            <p>${firstName.value} ${lastName.value}</p>
            <p>${address.value}</p>
            <p>${city.value} ${postalCode.value}</p>
            <p></p>
        </div>
        `
    } else {

        htmlDeliveryInfo = `
        <div>
        <h4>Delivery</h4>
        <p>${firstName.value} ${lastName.value}</p>
        <p>${deliveryAddress.value}</p>
        <p>${deliveryCity.value} ${deliveryPostalCode.value}</p>
        </div>
        `
    }

    html += htmlDeliveryInfo;
    summary.innerHTML = html
    sumTotalPrice.innerHTML = `Total: $${total}`
}
cartSummary();