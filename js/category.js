const productGrid = document.querySelector(".product_grid");
const productGridUl = document.createElement("ul")

const productsUrl = "https://www.snakesandbeans.com/wp-json/wc/store/products/";

let products = [];
async function getProductsFromRestAPI() {
    const response = await fetch(productsUrl);
    products = await response.json();

    createCategoryPage(products);
    //running twice for content (temporary)

    console.log(products)

}

function createCategoryPage(array) {
    productGridUl.innerHTML = "";
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

getProductsFromRestAPI();


const filterBtn = document.querySelector(".filter-btn");
filterBtn.addEventListener("click", filterItems);

function filterItems() {
    let newFilteredArray = products;

    let filterSex = document.querySelector("#filter_sex");
    let filterSize = document.querySelector("#filter_size");
    let filterPrice = document.querySelector("#filter_price");
    let filterByDataSex = filterSex.options[filterSex.selectedIndex].dataset.filterSex;
    let filterByDataSize = filterSize.options[filterSize.selectedIndex].dataset.filterSize;
    let filterByDataPriceLess = filterPrice.options[filterPrice.selectedIndex].dataset.filterPriceLess;
    let filterByDataPriceMore = filterPrice.options[filterPrice.selectedIndex].dataset.filterPriceMore;

    if(filterByDataSex) {newFilteredArray = newFilteredArray.filter(product => product.categories.find(category => category.name === filterByDataSex))}
    if(filterByDataSize) {newFilteredArray = newFilteredArray.filter()}
    if(filterByDataPriceLess) {newFilteredArray = newFilteredArray.filter(product => product.prices.price < filterByDataPriceLess)}
    if(filterByDataPriceMore) {newFilteredArray = newFilteredArray.filter(product => product.prices.price > filterByDataPriceMore)}

    createCategoryPage(newFilteredArray);
}
