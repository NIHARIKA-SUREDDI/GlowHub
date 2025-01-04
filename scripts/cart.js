const cartContainer = document.getElementById("cart-container");
const totalAmountElement = document.getElementById("total-amount");
// Fetch cart data from localStorage
function loadCart() {
    const storedBag = localStorage.getItem("bag");
    let cartItems = storedBag ? JSON.parse(storedBag) : [];

    // Display the products in the cart
    cartContainer.innerHTML = ""; // Clear previous data

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty.</h2>";
        totalAmountElement.textContent = "Total: ₹0.00"; // Reset total
        return;
    }
    let totalAmount = 0; // Initialize total amount
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
        price.textContent = `Price: ${item.price}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeFromCart(index));

        card.append(image, title, price, removeBtn);
        cartContainer.appendChild(card);

        // Extract numeric value from price and calculate total
        const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
        totalAmount += numericPrice;
    });
    totalAmountElement.textContent = `Total: ₹${totalAmount.toFixed(2)}`; // Format with 2 decimals
}

// Function to add a product to the cart
function addToCart(product) {
    // Get existing cart data
    const storedBag = localStorage.getItem("bag");
    let cartItems = storedBag ? JSON.parse(storedBag) : [];

    // Add the new product
    // cartItems.push(product);

    cartItems.push({
        productname: product.productname,
        productimage: product.productimage,
        price: parseFloat(product.price) || 0 // Convert price to number
    });

    // Update localStorage
    localStorage.setItem("bag", JSON.stringify(cartItems));

    // Show alert message
    alert("Item added to bag.");

    
    loadCart();
}

// Remove product from cart
function removeFromCart(index) {
    const storedBag = localStorage.getItem("bag");
    let cartItems = storedBag ? JSON.parse(storedBag) : [];

    // Remove the selected item
    cartItems.splice(index, 1);

    // Update localStorage
    localStorage.setItem("bag", JSON.stringify(cartItems));

    alert(" item remove from cart.");
    loadCart();
}


// const addToBagButton = document.getElementById("add-to-bag-btn");
// addToBagButton.addEventListener("click", () => addToCart(product));
loadCart();



