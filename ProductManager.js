import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async GetProducts(queryObj) {
    const {limit} = queryObj
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const productsArray = JSON.parse (info)
        return limit ? productsArray.slice(0,limit) : productsArray;
      } else {
        await fs.promises.writeFile(this.path, "[]");
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const products = await this.GetProducts();
      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return "Por favor complete todos los parametros del producto";
      } else {
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(idProduct) {
    try {
      const products = await this.GetProducts();
      const product = products.find((p) => p.id === idProduct);
      if (!product) {
        console.log("no product");
        return "No product";
      } else {
          console.log(product);
          return product;
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.GetProducts();
      const newArrayProducts = products.filter((p) => p.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
    } catch (error) {
      return error;
    }
  }

  async updateProduct(idProduct, newValue) {
    try {
      let product = await this.getProductById(idProduct);
      product = { id: idProduct, ...product, ...newValue };
      const products = await this.GetProducts();
      const productID = products.findIndex((p) => p.id === idProduct);
      const productsUpdated = products.map((p, index) => {
        if (index === productID) {
          return product;
        } else {
          return p;
        }
      });
      await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated));
      return productsUpdated;
    } catch (error) {
      return error;
    }
  }
}

async function test() {
  const manager1 = new ProductManager("Products.json");
  //    await manager1.addProduct("Tele","Smart TV",100000,"no image","A2",30)
  //    await manager1.addProduct("IPhoneX","SmartPhone",150000,"no image","A1",15)
  // await manager1.addProduct("Samsung S23","SmartPhone",200000,"no image","A3",45)
  // await manager1.addProduct("LicuadoraXPrime","Cocina",30000,"no image","A4",8)
  // await manager1.deleteProduct(2)
  await manager1.getProductById(1);
  // let updateToDo = {
  //     title: 'Update',
  //     description: 'Este es un producto de prueba modificado',
  //     price: 999,
  //     thumbnail: 'no image',
  //     code: 'A999',
  //     stock: 999
  // }
  // await manager1.updateProduct(1,updateToDo)
  // const products = await manager1.GetProducts()
  // console.log(products);
}
test();

export const productsManager = new ProductManager("Products.json");
