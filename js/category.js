const productGrid = document.querySelector(".product_grid");
const productGridUl = document.createElement("ul")

const productsUrl = "https://www.snakesandbeans.com/wp-json/wc/store/products";

async function getProductsFromRestAPI() {
    const response = await fetch(productsUrl);
    const products = await response.json();

    createCategoryPage(products);
    createCategoryPage(products);
    //running twice for content (temporary)

}

function createCategoryPage(array) {
    array.forEach(item => {
        let price = item.prices.price / 100;
    
        productGridUl.innerHTML += `
        <li class="product">
            <a href="product-specific.html?id=${item.id}">
                <div class="product-item product-upright">
                    <img src="${item.images[0].src}" alt="${item.images[0].alt}" class="product_image">
                    <div>
                        <h3>${item.name}</h3>
                        <p class="price">$ ${price}</p>
                    </div>               
                </div>
            </a>  
        </li>
        `});

        productGrid.append(productGridUl)
}

getProductsFromRestAPI()