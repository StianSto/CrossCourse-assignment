const winterCollectionProductsList = document.querySelector(".product_list--wintercollection")
const popularProductsList = document.querySelector(".product_list--popular");

const productsUrl = "https://www.snakesandbeans.com/wp-json/wc/store/products";
let products = [];
async function getProductsFromRestAPI() {
    const response = await fetch(productsUrl);
    const products = await response.json();
    console.log(products);
 
    const featuredProducts= products.filter(product => product.tags.find(tag => tag.name === "featured"))
    console.log(featuredProducts)

    function createproducts(productArr, createHtml) {
  
    productArr.forEach(product => {
        let price = product.prices.price / 100;
        let html = `
        <li class="product">
            <a href="product-specific.html?id=${product.id}"> 
                <div class="product-item product-upright">
                    <img src="${product.images[0].src}" alt="${product.alt}" class="product_image">               
                    <div>
                        <h3>${product.name}</h3>
                    </div>
                    <p class="price">$ ${price}</p>
                </div>
            </a>  
        </li>`;
        createHtml.innerHTML += html;
        
    });
         
    }
    createproducts(products, popularProductsList);
    createproducts(products, popularProductsList);

    createproducts(featuredProducts, winterCollectionProductsList);
    createproducts(featuredProducts, winterCollectionProductsList);
}

getProductsFromRestAPI();


