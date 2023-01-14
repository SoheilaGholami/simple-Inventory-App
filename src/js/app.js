import CategoryView  from "./CategoryView.js";
import productView from "./productView.js";

document.addEventListener('DOMContentLoaded',()=>{
    CategoryView.setApp();
    productView.setApp();

    console.log(CategoryView);
    console.log(productView);
    CategoryView.creatCategoriesList();
    productView.creatProductsList(productView.products);

})