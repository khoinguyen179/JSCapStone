import Cart from "./../Models/Cart.js";
import ProductList from "./../Models/ProductList.js";

const productList =new ProductList();
const cart =new Cart();
let crc = Intl.NumberFormat("vi-VN" , {style: 'currency' , currency: "VND"});

export function getId(id) {
    return document.getElementById(id);
}
getLocalStorage();
function getListProduct(){
    const promise = axios({
        url: "https://68a6bd38639c6a54e99faa84.mockapi.io/api/Products",
        method: "GET"
    });

    promise.then(function(response){
        renderListProduct(response.data);
    }).catch(function(error){
        console.log(error);
    });

}

function getProductByIdApi(id) {
    const promise = axios({
        url: `https://68a6bd38639c6a54e99faa84.mockapi.io/api/Products/${id}`,
        method: "GET",
    });

    return promise;
}

function getFilterProduct(type) {
    const promise = axios ({
        url: `https://68a6bd38639c6a54e99faa84.mockapi.io/api/Products?type=${type}`,
        method: "GET",
    });
    return promise;
}



function renderListProduct(data){
    let contentHTML ="";
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
        <div class="product-item large">
                                <div class="product-item-inside">
                                    <!-- Product Label -->
                                    <div class="product-item-label label-new"><span>New</span></div>
                                    <div class="product-item-label label-sale"><span>HOT</span></div>
                                    <!-- /Product Label -->
                                    <div class="product-item-info">
                                        <!-- Product Photo -->
                                        <div class="product-item-photo">
                                            <!-- product inside carousel -->
                                            <div class="carousel-inside fade" data-ride="carousel">
                                                <div class="carousel-inner">
                                                    <div class="item active">
                                                        <a href="#"><img class="product-image-photo" src=${product.img} alt=""></a>
                                                    </div>
                                                    <div class="item">
                                                        <a href="#"><img class="product-image-photo" src="images/products/product-11-1.jpg" alt=""></a>
                                                    </div>
                                                    <div class="item">
                                                        <a href="#"><img class="product-image-photo" src="images/products/product-11-2.jpg" alt=""></a>
                                                    </div>
                                                    <div class="item">
                                                        <a href="#"><img class="product-image-photo" src="images/products/product-11-3.jpg" alt=""></a>
                                                    </div>
                                                </div>
                                                <a class="carousel-control next"></a>
                                                <a class="carousel-control prev"></a>
                                            </div>
                                            <!-- /product inside carousel -->
                                            
                                        </div>
                                        <!-- /Product Photo -->
                                        <!-- Product Details -->
                                        <div class="product-item-details">
                                            <div class="product-item-name"> <a title="Boyfriend Short" href="product.html" class="product-item-link">${product.name}</a> </div>
                                            <div class="product-item-description">${product.desc}</div>
                                            <div class="product-item-description">${product.screen}</div>
                                            <div class="product-item-description">${product.backCamera}</div>
                                            <div class="product-item-description">${product.frontCamera}</div>
                                            <div class="price-box"> <span class="price-container"> <span class="price-wrapper"> <span class="old-price">${crc.format(product.price * 1000 + (product.price * 70)) }</span> <span class="special-price">${crc.format(product.price * 1000) }</span> 
                                            </span>\t\t\t\t\t\t\t\t\t\t\t\t\t</span>
                                            </div>
                                            <!-- Product Actions -->
                                            <div class="product-item-actions">
                                                <div class="actions-primary">
                                                    <button class="btn btn-sm btn-invert add-to-cart" data-product="789123" onclick="handleAddToCart(${product.id})"> <i class="icon icon-cart"></i><span>Add to Cart</span> </button>
                                                </div>
                                            </div>
                                            <!-- /Product Actions -->
                                        </div>
                                        <!-- /Product Details -->
                                    </div>
                                </div>
                            </div>`
    }

    getId("list-product").innerHTML = contentHTML;
}

getListProduct();

function setLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart.arr));
}
function getLocalStorage() {
    const data = localStorage.getItem("cart");
    if (data) {
        cart.arr = JSON.parse(data);
        renderListCart(cart.arr);
    }
}
function handleAddToCart(id){
    getProductByIdApi(id).then(function (result){
        if(cart.getProductById(id)){
            cart.updateCart(cart.getProductById(id).quantity+1,id)
            setLocalStorage();
            renderListCart(cart.arr);
        }
        else {
            const data = result.data;
            cart.addCart(data);
            setLocalStorage();
            renderListCart(cart.arr);
        }
    });
}


function renderListCart(data){
    let contentHTML = "";
    let contentHeaderCart = "";
    for (let i = 0; i < data.length; i++){
        const product = data[i];
        contentHTML +=  `
        <li>
        
                    <a href="" title="Product Name Long Name"><img class="product-image-photo" src="${product.img}" alt=""></a>
                    <span class="item-qty">${product.quantity}</span>
                    <div class="actions">
                        <a href="#" class="action edit" title="Edit item"><i class="icon icon-pencil"></i></a>
                        <a class="action delete" href="#" title="Delete item" onclick="handleDeleteCart(${product.id})"><i class="icon icon-trash-alt"></i></a>
                        <div class="edit-qty">
                            <input type="number" value="${product.quantity}" id="footer-cart-quantity-${product.id}" onchange="handleUpdateCart(${product.id})">
                            <button type="submit" class="btn" >Apply</button>
                        </div>
                    </div>
        
        </li>
        `
    }

    getId("cart-list").innerHTML = contentHTML;

    for (let i = 0; i < data.length; i++){
        const product = data[i];
        contentHeaderCart +=  `
          <li class="item product product-item">
                                                    <div class="product">
                                                        <a class="product-item-photo" href="#" title="Long sleeve overall">
                                                            <span class="product-image-container">
                                                            <span class="product-image-wrapper">
                                                            <img class="product-image-photo" src="${product.img}" alt="Long sleeve overall">
                                                            </span>
                                                            </span>
                                                        </a>
                                                        <div class="product-item-details">
                                                            <div class="product-item-name">
                                                                <a href="#">${product.name}</a>
                                                                
                                                            </div>
                                                            <div class="product-item-qty">
                                                                <label class="label">${product.quantity}</label>
                                                                <input class="item-qty cart-item-qty"  id="header-cart-quantity-${product.id}"  maxlength="12" value="${product.quantity}" onchange="handleUpdateCart(${product.id})">
                                                                <button class="update-cart-item" style="display: none" title="Update">
                                                                    <span>Update</span>
                                                                </button>
                                                            </div>
                                                            <div class="product-item-pricing">
                                                                <div class="price-container">
                                                                    <span class="price-wrapper">
                                                                    <span class="price-excluding-tax">
                                                                    <span class="minicart-price">
                                                                    <span class="price">${crc.format(product.quantity * product.price * 1000)}</span> </span>
                                                                    </span>
                                                                    </span>
                                                                </div>
                                                                <div class="product actions">
                                                                    <div class="secondary">
                                                                        <a href="#" class="action delete" title="Remove item" onclick="handleDeleteCart(${product.id})">
                                                                            <span>Delete</span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="primary">
                                                                        <a class="action edit" href="#" title="Edit item">
                                                                            <span>Edit</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
        `
    }
    getId('header-cart').innerHTML = contentHeaderCart;
    getId("subtotal").innerHTML = `
        <div class="items-total">Items <span class="count">${cart.cartQuantiy()}</span></div>
        <div class="subtotal">Subtotal <span class="price">${crc.format( cart.subTotal()* 1000)}</span></div>`;
    getId("quantity-header-cart").innerHTML = `<i class="icon icon-cart"></i> <span class="badge">${cart.cartQuantiy()}</span>`;
    getId("header-cart-subtotal").innerHTML = `<span class="price-wrapper"><span class="price"></span>${crc.format(cart.subTotal() * 1000)}</span>`
    getId("quantity-footer-cart").innerHTML = `<i class="icon icon-cart"></i> ${cart.cartQuantiy()} Items`;
}

function handleDeleteCart(id){
    cart.deleteCart(id);
    setLocalStorage();
    renderListCart(cart.arr);
}

function handleClearCart(){
    cart.arr = [];
    setLocalStorage();
    renderListCart(cart.arr);
}

function handleUpdateCart(id){
        let headerValue = getId("header-cart-quantity-" + id).value *1;
        let footerValue = getId("footer-cart-quantity-" + id).value *1;
        let quantity = cart.getProductById(id).quantity;
        if(headerValue === quantity && footerValue !== quantity){
            quantity = footerValue;
        }
        else  if(footerValue === quantity && headerValue !== quantity){
            quantity = headerValue;
        }
        cart.updateCart(quantity,id);
        setLocalStorage();
        renderListCart(cart.arr);
}


getId("filter-type").addEventListener("change", function () {
    const type = getId("filter-type").value;
    getFilterProduct(type).then(function (result) {
        productList.arr = result.data;
        renderListProduct(productList.arr);
    }).catch(function (error) {
        console.log(error);
    })
})
window.handleAddToCart = handleAddToCart;
window.handleDeleteCart = handleDeleteCart;
window.handleClearCart = handleClearCart;
window.handleUpdateCart = handleUpdateCart;