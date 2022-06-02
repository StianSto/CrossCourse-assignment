import {products} from '/js/components/products.js';

const productGrid = document.querySelector(".product_grid");
const productGridUl = document.createElement("ul")

function createCategoryPage() {

    products.forEach(product => {
        
    
    productGridUl.innerHTML += `
    <li class="product">
        <a href="product-specific.html?id=${product.id}">
            <div class="product-item product-upright">
                <img src="${product.img}" alt="${product.altDescr}" class="product_image">
                <div>
                    <h3>${product.brandName} - ${product.productName}</h3>
                    <p class="price">$ ${product.price}</p>
                </div>               
            </div>
        </a>  
    </li>
    `

    // <li class="product">
    //     <a href="product-specific.html?id=${product.id}"> 
    //         <div class="product-item product-upright">
    //             <img src="${product.img}" alt="${product.altDescr}" class="product_image">               
    //             <div>
    //                 <h3>${product.brandName}</h3>
    //                 <h4>${product.productName}</h4>
    //             </div>
    //             <p class="price">$ ${product.price}</p>
    //         </div>
    //     </a>  
    // </li>`;
    });


    productGrid.append(productGridUl)
}
createCategoryPage();
createCategoryPage(); 
// running same function twice for content