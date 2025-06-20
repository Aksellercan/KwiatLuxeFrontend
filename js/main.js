import Globals from "./Globals.js";
document.addEventListener("DOMContentLoaded", async function(event) {
//document.addEventListener("DOMContentLoaded", () => {
  await Globals.isLoggedin();
  showWelcomeMessage();
  loadProducts();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }

  const ordersBtn = document.getElementById("ordersBtn");
  if (ordersBtn) {
    ordersBtn.addEventListener("click", goToOrdersPage);
  }
});

function showWelcomeMessage() {
  // const username = localStorage.getItem("username") || "Guest";
    const username = sessionStorage.getItem("username") || "Guest";
  const welcomeUser = document.getElementById("welcomeUser");
  if (welcomeUser) {
    welcomeUser.textContent = `Welcome, ${username}!`;
  }
}

async function loadProducts() {
  const productGrid = document.getElementById("productGrid");
  if (!productGrid) return;
  try {
    const products = await Globals.LoadProducts();
    if (products === null) throw new Error("Failed to fetch products");
      productGrid.innerHTML = "";
      products.forEach(product => {
        productGrid.appendChild(createProductCard(product));
      });
  } catch (error) {
    console.error("we couldnt find api:", error);
    showSampleProduct(productGrid);
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <h3>${product.productName}</h3>
    <span>$${product.productPrice.toFixed(2)}</span>
    <button class="details-btn">Show Details</button>
    <button class="add-cart-btn">Add to Cart</button>
  `;

  card.querySelector(".details-btn").addEventListener("click", () => {
    showProductModal(product);
  });

  card.querySelector(".add-cart-btn").addEventListener("click", () => {
    window.location.href = "pages/login.html";
  });

  return card;
}

function showSampleProduct(productGrid) {
  const sample = {
    name: "Sample Bouquet",
    description: "This is a placeholder flower while products load.",
    price: 19.99,
    image: "https://via.placeholder.com/300x200?text=Sample+Bouquet"
  };
  productGrid.innerHTML = "";
  productGrid.appendChild(createProductCard(sample));
}

function logoutUser() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("shoppingCart");
  window.location.href = "login.html";
}

function goToOrdersPage() {
  window.location.href = "orders.html";
}

function showProductModal(product) {
  alert(`Product: ${product.productName}\nDescription: ${product.productDescription || "No description"}\nPrice: $${product.productPrice.toFixed(2)}`);
}
