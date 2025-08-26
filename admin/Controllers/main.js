// admin/Controllers/main.js
import { Product, ProductService } from "./../Models/Products.js";

const service = new ProductService(
  "https://68a757aa639c6a54e9a1c48a.mockapi.io/Products"
); // đổi thành API thật
const form = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let products = [];
let editingId = null;

// Render danh sách
function renderProducts(data) {
  productList.innerHTML = data
    .map(
      (p) => `
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>${p.screen}</td>
      <td>${p.backCamera}</td>
      <td>${p.frontCamera}</td>
      <td><img src="${p.img}" width="50"></td>
      <td>${p.desc}</td>
      <td>${p.type}</td>
      <td>
        <button onclick="editProduct('${p.id}')">Sửa</button>
        <button onclick="deleteProduct('${p.id}')">Xóa</button>
      </td>
    </tr>
  `
    )
    .join("");
}

// Load dữ liệu ban đầu
async function loadProducts() {
  products = await service.getProducts();
  renderProducts(products);
}

// Thêm/Update sản phẩm
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validation
  const name = document.getElementById("name").value.trim();
  const price = +document.getElementById("price").value;
  const img = document.getElementById("img").value.trim();
  if (!name || price <= 0 || !img) {
    alert("Tên, giá > 0 và link hình ảnh không được để trống!");
    return;
  }

  const product = new Product(
    editingId,
    name,
    price,
    document.getElementById("screen").value.trim(),
    document.getElementById("backCamera").value.trim(),
    document.getElementById("frontCamera").value.trim(),
    img,
    document.getElementById("desc").value.trim(),
    document.getElementById("type").value.trim()
  );

  if (editingId) {
    await service.updateProduct(editingId, product);
    editingId = null;
  } else {
    await service.addProduct(product);
  }

  form.reset();
  loadProducts();
});

// Xóa sản phẩm
window.deleteProduct = async function (id) {
  await service.deleteProduct(id);
  loadProducts();
};

// Sửa sản phẩm (fill form)
window.editProduct = function (id) {
  const p = products.find((p) => p.id == id);
  if (!p) return;
  editingId = id;
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("screen").value = p.screen;
  document.getElementById("backCamera").value = p.backCamera;
  document.getElementById("frontCamera").value = p.frontCamera;
  document.getElementById("img").value = p.img;
  document.getElementById("desc").value = p.desc;
  document.getElementById("type").value = p.type;
};

// Tìm kiếm theo tên
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

// Sắp xếp theo giá
sortSelect.addEventListener("change", () => {
  let sorted = [...products];
  if (sortSelect.value === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "desc") {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderProducts(sorted);
});

loadProducts();
