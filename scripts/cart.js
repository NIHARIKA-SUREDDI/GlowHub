const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
// Fetch cart data from localStorage
function loadCart() {
    const storedBag = localStorage.getItem("bag");
    let cartItems = storedBag ? JSON.parse(storedBag) : [];

    // Display the products in the cart
    cartContainer.innerHTML = ""; // Clear previous data

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty.</h2>";
        return;
    }

    cartItems.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("cart-item");

        const image = document.createElement("img");
        image.src = item.productimage;
        image.alt = item.productname;
        image.classList.add("product-image");

        const title = document.createElement("h3");
        title.textContent = item.productname;

        const price = document.createElement("p");
        price.textContent = `Price: ₹${item.price}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeFromCart(index));

        card.append(image, title, price, removeBtn);
        cartContainer.appendChild(card);
    });
}

// Remove product from cart
function removeFromCart(index) {
    const storedBag = localStorage.getItem("bag");
    let cartItems = storedBag ? JSON.parse(storedBag) : [];

    // Remove the selected item
    cartItems.splice(index, 1);

    // Update localStorage
    localStorage.setItem("bag", JSON.stringify(cartItems));

    // Refresh the cart display
    loadCart();
}
function updateCartCount(count) {
    cartCount.textContent = count; // Set the cart count in the element
}

loadCart();
