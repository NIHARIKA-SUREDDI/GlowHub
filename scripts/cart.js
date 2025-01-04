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

// Function to add a product to the cart
function addToCart(product) {
    // Get existing cart data
    const storedBag = localStorage.getItem("bag");
    let cartItems = storedBag ? JSON.parse(storedBag) : [];

    // Add the new product
    cartItems.push(product);

    // Update localStorage
    localStorage.setItem("bag", JSON.stringify(cartItems));

    // Show alert message
    alert("Item added to bag.");

    // Update cart count (if displayed separately)
    updateCartCount(cartItems.length);
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



    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment').value.trim();
    if (name && email && address && payment) {
      alert(`Order placed successfully!\n\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment Method: ${payment}`);
    } else {
      alert('Please fill in all the fields!');
    }
  });
