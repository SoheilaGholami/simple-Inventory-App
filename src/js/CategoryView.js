import Storage from "./Storage.js";

//  get title , description
// save category
// update DOM
// clear field
// add btn
// cancle btn
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-descrition");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoryForm = document.querySelector("#category-form");
const toggleCategoryBtn = document.querySelector("#open-category-btn");
const cancleAddCategory = document.querySelector("#cancle-new-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancleAddCategory.addEventListener("click", (e) =>
      this.cancleAddCategory(e)
    );
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    // get title & description
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    // save category
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    // update DOM : update select option in category
    this.creatCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
    toggleCategoryBtn.classList.remove("font-bold");
    toggleCategoryBtn.classList.remove("text-slate-300");
    toggleCategoryBtn.classList.add("text-slate-500");
    categoryForm.classList.add("hidden");
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  creatCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="volvo">Select a category</option>`;
    this.categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-300" value=${element.id}>
        ${element.title}
      </option>`;
    });
    const categoryDom = document.getElementById("product-category");
    categoryDom.innerHTML = result;
  }
  toggleAddCategory(e) {
    e.preventDefault();
    toggleCategoryBtn.classList.add("font-bold");
    toggleCategoryBtn.classList.add("text-slate-300");
    toggleCategoryBtn.classList.remove("text-slate-500");
    categoryForm.classList.remove("hidden");
  }
  cancleAddCategory(e) {
    e.preventDefault();
    toggleCategoryBtn.classList.remove("font-bold");
    toggleCategoryBtn.classList.remove("text-slate-300");
    toggleCategoryBtn.classList.add("text-slate-500");
    categoryForm.classList.add("hidden");
  }
}



export default new CategoryView();

