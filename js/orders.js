import Globals from "./Globals.js";

document.addEventListener("DOMContentLoaded", async function(event) {
event.preventDefault();
  showWelcomeMessage();
  loadOrders();
  Globals.isLoggedin();
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
    });
  }
});

function showWelcomeMessage() {
  const username = sessionStorage.getItem("username") || "Guest";
  const welcomeUser = document.getElementById("welcomeUser");
  if (welcomeUser) {
    welcomeUser.textContent = `Welcome, ${username}!`;
  }
}

async function loadOrders() {
  const ordersContainer = document.getElementById("ordersContainer");
  if (!ordersContainer) return;

  
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${Globals.getapiBaseUrl()}/order/myorders`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();

    if (!orders.length) {
      ordersContainer.innerHTML = "<p>You have no orders yet.</p>";
    } else {
      ordersContainer.innerHTML = "";
      orders.forEach(order => {
        ordersContainer.appendChild(createOrderCard(order));
      });
    }
  } catch (error) {
    console.error("Error - orders couldnt download:", error);
    ordersContainer.innerHTML = "<p style='color:red;'>Failed to load orders.</p>";
  }
}

function createOrderCard(order) {
  const card = document.createElement("div");
  card.className = "order-card";

  card.innerHTML = `
    <h3>Order #${order.id}</h3>
    <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
    <p><strong>Total Price:</strong> $${order.totalAmount.toFixed(2)}</p>
    <div class="order-items">
      <strong>Items:</strong>
      <ul>
        ${order.orderProducts.map(orderProducts => `<li>${orderProducts.productId} x${orderProducts.quantity}</li>`).join("")}
      </ul>
    </div>
  `; //orderProducts does not have product name nor does it save the object. so we will have to iterate products on screen to api url /Product/get{id} d=====(￣▽￣*)b

  return card;
}

function logoutUser() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("role");
  localStorage.removeItem("token");
  window.location.href = "/pages/login.html";
}
