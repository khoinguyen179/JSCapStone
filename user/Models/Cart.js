

export default class  Cart{

    constructor() {
        this.arr = [];
    }

    addCart(product){
        this.arr.push(product);
        product.quantity = 1;
    }

    updateCart(data, id){
        let product = this.getProductById(id);
        product.quantity = data;
    }

    deleteCart(id){
        let index =-1;
        index = this.arr.findIndex(product=>product.id*1 === id);
        this.arr.splice(index,1);
    }



    cartQuantiy(){
        let quantity = 0;
        for (let i=0; i<this.arr.length;i++){
            quantity += this.arr[i].quantity;
        }
        return quantity;
    }

    subTotal(){
        let subtotal = 0;
        for (let i =0; i < this.arr.length; i++){
            let product = this.arr[i];
            subtotal += product.price * product.quantity;
        }
        return subtotal;
    }

    getProductById(id){
        let index = -1;
        index = this.arr.findIndex(product=>product.id*1 === id);
        return this.arr[index];
    }
}