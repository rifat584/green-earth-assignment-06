// Loading
const spinnerActivate = (status) => {
  const spinner = document.getElementById("loading");
  // const spinner2 = document.getElementById('loading2')
  if (status) {
    spinner.classList.remove("hidden");
    document.getElementById("all-tree-container").classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    document.getElementById("all-tree-container").classList.remove("hidden");
  }
};

// get Modal Content
const getPlantsInfo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((response) => response.json())
    .then((responseData) => showModalContent(responseData.plants));
};

// Show Modal Content
const showModalContent = (data) => {
  const parent = document.getElementById("modal-content");
  const child = document.createElement("div");
  parent.innerHTML = "";
  child.innerHTML = `
    <h3 class="text-2xl font-bold">${data.name}</h3>
    <div class="rounded-lg overflow-hidden aspect-16/9">
      <img src=${data.image} alt="" class="w-full h-full object-cover"/>
    </div>
    <p> <span   class="font-semibold">Category:</span> ${data.category}</p>
    <p><span class="font-semibold">Price:</span> ৳${data.price}</p>
    <p class="text-[#1f2937]"><span class="font-semibold">Description:</span> ${data.description}</p>

    <div class="modal-action">
      <form method="dialog">
      <button class="btn">Close</button>
      </form>
    </div>

  `;
  child.setAttribute("class", "space-y-2");
  parent.appendChild(child);
  document.getElementById("tree_modal").showModal();
};
// Get All Plants
const getAllPlants = () => {
  spinnerActivate(true);
  const allPlantURL = "https://openapi.programming-hero.com/api/plants";
  fetch(allPlantURL)
    .then((response) => response.json())
    .then((plantsData) => {
      showAllPlants(plantsData.plants);
    });
};
// Show All Plants
const showAllPlants = (plants) => {
  const treeContainer = document.getElementById("all-tree-container");
  treeContainer.innerHTML = "";
  plants.forEach((plant) => {
    const plantCard = document.createElement("div");
    plantCard.innerHTML = `
                  <div class="bg-[#ededed] rounded-lg overflow-hidden aspect-16/9">
                <img
                  src=${plant.image}
                  alt=""
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 onclick="getPlantsInfo(${plant.id})" class="text-lg font-medium mt-4 mb-1" id="tree-${plant.id}">${plant.name}</h3>
              <p class="text-[#1f2937]">${plant.description}</p>
              <div class="flex justify-between mt-4">
                <a
                  class="btn btn-primary bg-[#dcfce7] text-[#15803d] rounded-full border-none shadow-none"
                  >${plant.category}</a>
                <h3 class="text-lg font-medium">৳ ${plant.price}</h3>
              </div>
              <button
                class="btn btn-primary btn-block bg-[#15803d] text-white border-none rounded-full mt-4 hover:bg-[#facc15] hover:text-base transition-all duration-100 atc-btn"
                
                onclick="atcCount('${plant.name}',${plant.price})"
              >
                Add to Cart
              </button>
    `;
    plantCard.classList.add(
      "h-full",
      "gap-4",
      "bg-white",
      "p-4",
      "rounded-lg",
      "flex",
      "justify-evenly",
      "flex-col"
    );
    treeContainer.appendChild(plantCard);
  });
  spinnerActivate(false);
};

// Show Categories
const showCategories = (dataArr) => {
  const categories = document.getElementById("categories");
  dataArr.forEach((category) => {
    const dynamicCategory = document.createElement("li");
    dynamicCategory.innerHTML = `${category.category_name}`;

    dynamicCategory.setAttribute("id", `btn-${category.id}`);
    dynamicCategory.setAttribute(
      "class",
      "category-item btn lg:w-full lg:justify-start! btn-ghost border-none hover:bg-[#cff0dc] hover:text-base transition-all duration-100 shadow-none"
    );
    categories.appendChild(dynamicCategory);
    dynamicCategory.addEventListener("click", () => {
      showCategoryPlant(category.id);
    });
  });
  showActive();
};

// Get Categories
const getCategories = () => {
  // spinnerActivate(false)
  const categoryURL = "https://openapi.programming-hero.com/api/categories";
  fetch(categoryURL)
    .then((response) => response.json())
    .then((responseData) => showCategories(responseData.categories));
};

// Show Plants by Category
const showCategoryPlant = (id) => {
  const plantCatURL = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(plantCatURL)
    .then((response) => response.json())
    .then((categoryData) => showAllPlants(categoryData.plants));
  // spinnerActivate(false)
};

// All Plants
const allPlants = document.getElementById("all-plants");
allPlants.addEventListener("click", () => {
  getAllPlants();
});

// ATC

getCategories();
getAllPlants();

let total = 0;
let priceReduced = 0;
const atcCount = (name, price) => {
  total = total + price;

  // Add Item & Amount in Cart
  const cart = document.getElementById("cart");
  const atcCard = document.createElement("div");
  atcCard.innerHTML = `
  <div>
                <h4>${name}</h4>
                <p class="text-[#1f2937]">৳<span id="plant-amount">${price}</span> &times; 1</p>
              </div>
              <div onclick="cartRemove(${price})" class="hover:text-lg">
                <i class="fa-solid fa-xmark fa-xl" style="color:red;"></i>
              </div>
  `;
  atcCard.setAttribute(
    "class",
    "flex items-center justify-between p-4 bg-[#f0fdf4] mb-4 carts"
  );
  cart.appendChild(atcCard);
  document.getElementById("t-amount").innerText = total;
};

// Remove Cart & Set Total Value
const cartRemove = (price) => {
  priceReduced = price + priceReduced;
  const carts = document.getElementById("cart");
  carts.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-xmark")) {
      const removeParent = e.target.closest(".carts");
      removeParent.remove();
    }
  });

  const finalPrice = total - priceReduced;
  if (finalPrice === 0) {
    total = 0;
  }
  document.getElementById("t-amount").innerText = finalPrice;
};

// Active Button
const showActive = () => {
  const allCategories = document.getElementsByClassName("category-item");
  const allCategoriesArray = Array.from(allCategories);

  allCategoriesArray.forEach((element) => {
    element.addEventListener("click", (e) => {
      for (const category of allCategories) {
        category.classList.remove("active");
      }
      e.target.classList.add("active");
    });
  });
};
