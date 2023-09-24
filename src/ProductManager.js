import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async GetProducts(queryObj) {
    let limit = queryObj !== undefined ? queryObj : 0;
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const productsArray = JSON.parse(info);
        return limit ? productsArray.slice(0, limit) : productsArray;
      } else {
        await fs.promises.writeFile(this.path, "[]");
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(NewProduct) {
    try {
      const products = await this.GetProducts();
      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        ...NewProduct,
        status: true,
      };
      console.log(newProduct);
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductById(idProduct) {
    const products = await this.GetProducts();
    const product = products.find((p) => p.id === idProduct);
    try {
      if (product === undefined) {
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


export const productsManager = new ProductManager("Products.json");
