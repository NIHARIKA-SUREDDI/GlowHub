let container = document.getElementById("container");
let searchInput = document.getElementById("search-input");
let productData;
async function fetchData() {
    try {
        let res = await fetch("https://stump-humorous-gorgonzola.glitch.me/product");
        let data = await res.json();
        console.log(data);
        productData = data
        if (productData && typeof productData === 'object') {
            productData = Object.values(productData);
        }

        // Filter out any null or undefined elements from the productData array
        productData = productData.filter(element => element !== null);
        setupFilters(productData); // Set up the filter functionality
        appendData(productData); // Display all products initially

       
        document.getElementById("filter-price").addEventListener("click", () => applyPriceFilter(productData));
    } catch (err) {
        console.error(err);
    }
}

// Function to display the cards on the page
function appendData(data) {
    container.innerHTML = ""; // Clear previous content
    data.forEach((item) => container.append(createCard(item)));
}

// Function to create a product card
function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.name;
    image.classList.add('item-image');

    image.addEventListener("click", () => {
        // Save product name to localStorage
        localStorage.setItem("productName", item.name);
        // Redirect to the product details page
        window.location.href = "productDetails.html";
    });

    const title = document.createElement("h2");
    title.textContent = item.name;
    title.classList.add("item-title");

    const price = document.createElement("p");
    price.textContent = `MRP: ₹${Number(item.price).toFixed(2)}`;

    const button = document.createElement("button");
    button.classList.add("add-to-bag");
    button.textContent = "Add To Bag";
    button.onclick = () => addTocartDetails(item.id);


    const rating = document.createElement("div");
    rating.classList.add("rating");
    rating.innerHTML = renderStars(item.ratings) + `<span>${item.ratings}</span>`;

    card.append(image, title, price, rating, button);
    /*card.addEventListener("click", () => {
    // Save product name to localStorage
    localStorage.setItem("productName", item.name);
    // Redirect to the product details page
    window.location.href = "product-details.html";
});*/

    return card;
}

// Function to set up category filter buttons
function setupFilters(data) {
    document.querySelector(".btn-all").addEventListener("click", () => appendData(data));
    document.querySelector(".btn-makeup").addEventListener("click", () => filterCategory(data, "Makeup"));
    document.querySelector(".btn-skincare").addEventListener("click", () => filterCategory(data, "Skincare"));
    document.querySelector(".btn-Haircare").addEventListener("click", () => filterCategory(data, "Haircare"));
    document.querySelector(".btn-Body-Care").addEventListener("click", () => filterCategory(data, "Body Care"));
    document.querySelector(".btn-Fragrance").addEventListener("click", () => filterCategory(data, "Fragrance"));
    document.querySelector(".btn-Cameras").addEventListener("click", () => filterCategory(data, "Cameras"));
}

// Function to filter products by category
function filterCategory(data, category) {
    const filteredData = data.filter((item) => item.category === category);
    appendData(filteredData);
}

// Function to filter products by search input
function searchProducts(data) {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm));
    appendData(filteredData);
}

// Function to apply price range filter
function applyPriceFilter(data) {
    const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

    // Filter the products based on the price range
    const filteredData = data.filter((item) => item.price >= minPrice && item.price <= maxPrice);
    appendData(filteredData); // Display the filtered products
}

// Rating function
function renderStars(rating) {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Check for half star
    const emptyStars = 5 - fullStars - halfStar; // Remaining stars

    let starHTML = "";

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starHTML += `<span class="star full">★</span>`;
    }

    // Add half star if applicable
    if (halfStar) {
        starHTML += `<span class="star half">★</span>`;
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starHTML += `<span class="star empty">☆</span>`;
    }

    return starHTML;
}

//start cart //
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
const cartButton = document.getElementById("cart-button");
const cartContent = document.getElementById("cart-content");
const cartItems = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-button");

// Toggle cart visibility
cartButton.addEventListener("click", () => {
    cartContent.classList.toggle("active");
});

