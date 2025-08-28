// admin/Controllers/main.js
import { Product, ProductService } from "./../Models/Products.js";

const service = new ProductService(
  "https://68a757aa639c6a54e9a1c48a.mockapi.io/Products"
);
const form = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let products = [];
let editingId = null;

//Modal
//Mở model add sản phẩm
function openModal(title = "Thêm sản phẩm") {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("product-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("product-modal").classList.add("hidden");
}

// Đóng modal
document.getElementById("close-modal").addEventListener("click", closeModal);

// Render danh sách
function renderProducts(data) {
  productList.innerHTML = data
    .map(
      (p) => `
    <tr class="border-b hover:bg-gray-50">
      <td class="px-3 py-2">${p.id}</td>
      <td class="px-3 py-2">${p.name}</td>
      <td class="px-3 py-2">${p.price}</td>
      <td class="px-3 py-2">${p.screen}</td>
      <td class="px-3 py-2">${p.backCamera}</td>
      <td class="px-3 py-2">${p.frontCamera}</td>
      <td class="px-3 py-2"><img src="${p.img}" class="w-12 h-12 object-cover rounded" /></td>
      <td class="px-3 py-2">${p.desc}</td>
      <td class="px-3 py-2">${p.type}</td>
      <td class="px-3 py-2 space-x-2">
        <button 
          class="edit-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          data-id="${p.id}">
          Sửa
        </button>
        <button 
          class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          data-id="${p.id}">
          Xóa
        </button>
      </td>
    </tr>
  `
    )
    .join("");
  // Gắn lại sự kiện sau khi render
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      editProduct(id);
    })
  );

  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      deleteProduct(id);
    })
  );

  document
    .querySelectorAll(".edit-btn")
    .forEach((btn) =>
      btn.addEventListener("click", () => editProduct(btn.dataset.id))
    );
}

// Load dữ liệu ban đầu
async function loadProducts() {
  products = await service.getProducts();
  renderProducts(products);
}

// Thêm/Update sản phẩm
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form đã được submit!");

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
async function deleteProduct(id) {
  await service.deleteProduct(id);
  //Cập nhật product
  products = products.filter((p) => p.id !== id);
  renderProducts(products);
}

// Sửa sản phẩm (fill form)
function editProduct(id) {
  const p = products.find((p) => p.id == id);
  if (!p) return;
  editingId = id;

  // Fill form
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("screen").value = p.screen;
  document.getElementById("backCamera").value = p.backCamera;
  document.getElementById("frontCamera").value = p.frontCamera;
  document.getElementById("img").value = p.img;
  document.getElementById("desc").value = p.desc;
  document.getElementById("type").value = p.type;

  openModal("Cập nhật sản phẩm");
}

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
