import Storage from "./storage.js";

const addProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
  constructor() {
    addProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value;
    const quantity = document.querySelector("#product-quantity").value;
    const category = document.querySelector("#product-category").value;
    if (!quantity || !title || !category) return;
    Storage.saveProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();
    // update DOM
    this.creatProductsList(this.products);
    title.value = "";
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  creatProductsList(products) {
    let result = "";
    products.forEach((element) => {
      // convert id category to name
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == element.category
      ).title;
      result += `<div class="flex items-center justify-between >
    <span class="text-slate-300">${element.title}</span>
    <div class="flex items-center gap-x-2">
      <span>${new Date().toLocaleDateString("en")}</span>
      <span
        class="py-0.3 rounded-xl border border-slate-400 px-2 text-sm text-slate-400"
        >${selectedCategory}</span
      >
      <span
        class="text-slate-300 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-slate-500 text-sm"
        >${element.quantity}</span
      >
      <button
        data-id=${
          element.id
        } class= "delete-product py-0.3 rounded-xl border border-red-400 px-2 text-sm text-red-400"
      >
        delete
      </button>
    </div>
  </div>`;
    });
    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;
    const deleteBtns =[... document.querySelectorAll(".delete-product")];
    deleteBtns.forEach(element => {
      element.addEventListener('click',(e)=>this.deleteProduct(e));
    });

  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    console.log(value);
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.creatProductsList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    console.log({value});
    this.products = Storage.getAllProducts(value)
    this.creatProductsList(this.products)
  }
  deleteProduct(e){
    const productId = e.target.dataset.id;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.creatProductsList(this.products)

  }
  editProduct(){}
}

export default new ProductView();
