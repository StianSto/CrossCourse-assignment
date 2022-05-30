import {products} from '/js/components/products.js';

const winterCollectionProductsList = document.querySelector(".product_list--wintercollection")
const popularProductsList = document.querySelector(".product_list--popular")

products.forEach(product => {
    let html = `<li class="product">
    <a href="product-specific.html"> 
        <div class="product-item product-upright">
            <img src="${product.img}" alt="${product.altDescr}" class="product_image">               
            <div>
                <h3>${product.brandName}</h3>
                <h4>${product.productName}</h4>
            </div>
            <p class="price">$ ${product.price}</p>
        </div>
    </a>  
</li>`;
    winterCollectionProductsList.innerHTML += html;
    popularProductsList.innerHTML += html;
});