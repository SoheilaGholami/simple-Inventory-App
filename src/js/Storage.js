const products = [
  {
    id: 1,
    title: "html",
    quantity: 2,
    category: "frontend",
    createdAt: "2022-06-13T18:30:00.000Z",
  },
  {
    id: 2,
    title: "css",
    quantity: 2,
    category: "frontend",
    createdAt: "2021-06-13T18:30:00.000Z",
  },
  {
    id: 3,
    title: "nodejs",
    category: "backend",
    createdAt: "2022-12-13T18:30:00.000Z",
  },
];
const categories = [
  {
    id: 1,
    title: "frontend",
    description: "web application",
    createdAt: "2022-06-13T18:30:00.000Z",
  },
  {
    id: 2,
    title: "backend",
    description: "web application",
    createdAt: "2020-06-13T18:30:00.000Z",
  },
];

export default class Storage {
  // add new category
  // save category
  // get all categories
  // add new product
  // save product
  // get all products
  // remove product

  static getAllCategories() {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(categoryToSave) {
    const categoriesList = Storage.getAllCategories();

    const existedCategory = categoriesList.find(
      (category) => category.id == categoryToSave.id
    );
    // edit(existed) => ...save
    if (existedCategory) {
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
      existedCategory.createdAt = new Date().toISOString();
    }
    // new => ...save
    else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      categoriesList.push(categoryToSave);
    }
    localStorage.setItem("categories", JSON.stringify(categoriesList));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest")
        return new Date(a.createddAt) > new Date(b.createdAt) ? 1 : -1;
      else if (sort === "oldest")
        return new Date(a.createddAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedProducts;
  }
  static saveProduct(productToSave) {
    const productsList = Storage.getAllProducts();

    const existedProduct = productsList.find((p) => p.id == productToSave.id);
    // edit(existed) => ...save
    if (existedProduct) {
      existedProduct.title = productToSave.title;
      existedProduct.quantity = productToSave.quantity;
      existedProduct.category = productToSave.category;
      // existedProduct.createdAt = new Date().toISOString();
    }
    // new => ...save
    else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      productsList.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(productsList));
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProduct = savedProducts.filter((e) => e.id != id);
    localStorage.setItem("products",JSON.stringify(filteredProduct));
  }
}
