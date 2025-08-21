
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
    console.log(data);
}

getListProduct();