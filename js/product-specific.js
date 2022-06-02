import {products} from '/js/components/products.js';
import {addedToCart} from '/js/script.js';

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const productID = parseFloat(parameter.get("id"));

const productContainer = document.querySelector(".content_wrapper");
const productSpecific = document.createElement("div"); 

function createProductContent() {
    const product = products.find((product => product.id === productID))

    productSpecific.innerHTML = `
    <div class="product_specific_card">
        <div class="product-img">
            <img src="${product.img}" alt="${product.altDescr}">
        </div>
        <div class="wrapper_product_specific">
            <h1>${product.brandName} ${product.productName}</h1>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <i class="far fa-star"></i>
            </div>
            <p class="product_specific_review">(65)&nbspreviews</p>
            <select name="size" id="select_size">
                <option value="xs">XS</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xl">XL</option>
            </select>
            <p class="product_specific_info">Lorem, ipsum dolor sit deserunt quam cum incidunt, est repudiandae ducimus quisquam magnam assumenda corporis, molestias architectoLorem, ipsum dolor sit deserunt quam cum incidunt, est repudiandae ducimus quisquam magnam assumenda corporis, molestias architecto!</p>
            <h2>$ ${product.price}</h2>
            <button type="button" class="cta add-to-cart" data-product="${product.id}" >Add to Cart</button>
        </div>
    </div>
    `
    productContainer.prepend(productSpecific);
}
createProductContent()

const addToCartBtn = document.querySelector(".add-to-cart");
addToCartBtn.addEventListener("click", addedToCart);