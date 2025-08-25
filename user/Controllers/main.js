import Product from "./../models/Product.js";


let crc = Intl.NumberFormat("vi-VN" , {style: 'currency' , currency: "VND"});

export function getId(id) {
    return document.getElementById(id);
}

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
                                                    <button class="btn btn-sm btn-invert add-to-cart" data-product="789123"> <i class="icon icon-cart"></i><span>Add to Cart</span> </button>
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