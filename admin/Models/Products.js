// /admin/Models/Product.js

export class Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
  }
}

export class ProductService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getProducts() {
    const res = await axios.get(`${this.apiUrl}/products`);
    return res.data;
  }

  async addProduct(product) {
    const res = await axios.post(`${this.apiUrl}/products`, product);
    return res.data;
  }

  async updateProduct(id, product) {
    const res = await axios.put(`${this.apiUrl}/products/${id}`, product);
    return res.data;
  }

  async deleteProduct(id) {
    await axios.delete(`${this.apiUrl}/products/${id}`);
  }
}
