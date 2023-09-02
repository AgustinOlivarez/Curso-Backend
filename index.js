class ProductManager {
    constructor () {
        this.products = [];
    }

    addProductos(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.products.length ? this.products[this.products.length-1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        // console.log(product);
        if (this.products.find (codeRepetido => codeRepetido.code === product.code)) {
            console.log ("El producto ya existe")
        }
        else {
            this.products.push(product);
        }
        // console.log(this.products);
    };


    getProducts(){
      return (this.products);
    }

    getProductsById(IdToFind){
        if (this.products.find (IdExistente => IdExistente.id === IdToFind)) {
            return (this.products.find (IdExistente => IdExistente.id === IdToFind)
        )}
        else {
            return ("Not Found")
        }
    }
};


let product = new ProductManager();
product.addProductos("producto prueba","probando",10,"no image","A1",15);
product.addProductos("producto prueba 2","probando 2",20,"no image","A2",30);
console.log(product.getProductsById ());
console.log(product.getProducts())
