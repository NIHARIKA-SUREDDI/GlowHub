
let container = document.getElementById("container");
let bagContainer = document.getElementById("bag-container");

let allData = []; // Store all products globally

async function fetchData() {
    try {
        let res = await fetch("https://stump-humorous-gorgonzola.glitch.me/product");
        let data = await res.json();

        // Ensure data is an array
        if (!Array.isArray(data)) {
            data = Object.values(data).filter(element => element !== null);
        }

        allData = data; // Store all products globally
        setupFilters(allData); 
        appendData(allData); // Display all products initially

        document.getElementById("filter-price").addEventListener("click", () => applyPriceFilter(allData));
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

// Function to display the cards on the page
function appendData(data) {
    container.innerHTML = ""; // Clear previous content
    data.forEach((product) => container.append(createCard(product)));
}

// Function to create a product card
function createCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = product.productimage;
    image.alt = product.productname;
    image.classList.add('productimage');

    const button = document.createElement("button");
    button.classList.add("add-to-bag");
    button.textContent = "Add To Bag";

    button.addEventListener("click", () => {
        try {
            let bagProducts = JSON.parse(localStorage.getItem("bag")) || [];
            bagProducts.push(product);
            localStorage.setItem("bag", JSON.stringify(bagProducts));
            alert("Product added to bag successfully!");
        } catch (e) {
            console.error("Error adding product to bag:", e);
            alert("Failed to add product to bag.");
        }
    });

    const title = document.createElement("h2");
    title.textContent = product.productname;
    title.classList.add("product-title");

    const price = document.createElement("p");
    price.textContent = `MRP: ${product.price}`;

    const rating = document.createElement("div");
    rating.classList.add("rating");
    rating.innerHTML = renderStars(product.Rating) + `<span>${product.Rating}</span>`;

    card.append(image, title, price, rating, button);

    return card;
}

// Function to set up category filter buttons
// function setupFilters(data) {
//     document.querySelector(".btn-all").addEventListener("click", () => appendData(allData)); // Show all products
//     document.querySelector(".btn-makeup").addEventListener("click", () => filterCategory(allData, "Makeup"));
//     document.querySelector(".btn-skincare").addEventListener("click", () => filterCategory(allData, "Skincare"));
//     document.querySelector(".btn-Haircare").addEventListener("click", () => filterCategory(allData, "Haircare"));
//     document.querySelector(".btn-Fragrance").addEventListener("click", () => filterCategory(allData, "Fragrance"));
// }
function setupFilters(data) {
    const categoryButtons = document.querySelectorAll("#buttons button");
    
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove the 'active' class from all buttons
            categoryButtons.forEach(b => b.classList.remove("active"));

            // Add the 'active' class to the clicked button
            button.classList.add("active");

            // Show filtered products based on the category
            if (button.classList.contains("btn-all")) {
                appendData(allData);
            } else if (button.classList.contains("btn-makeup")) {
                filterCategory(allData, "Makeup");
            } else if (button.classList.contains("btn-skincare")) {
                filterCategory(allData, "Skincare");
            } else if (button.classList.contains("btn-Haircare")) {
                filterCategory(allData, "Haircare");
            } else if (button.classList.contains("btn-Fragrance")) {
                filterCategory(allData, "Fragrance");
            }
        });
    });
}



// Function to filter products by category
function filterCategory(data, category) {
    const filteredData = data.filter((product => product.category === category));
    appendData(filteredData);
}

function applyPriceFilter(data) {
    const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

    const filteredData = data.filter((product) => {
        const productPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
        return productPrice >= minPrice && productPrice <= maxPrice;
    });

    // Sort the filtered data in ascending order of price
    const sortedData = filteredData.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceA - priceB; // Change to `priceB - priceA` for descending order
    });

    appendData(sortedData);
}

// Function to render star ratings
function renderStars(rating) {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Check for half star
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars
    let starHTML = "";

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starHTML += `<span class="star full">★</span>`;
    }

    // Add a half star only if the rating is >= 0.5 after the full stars
    if (halfStar) {
        starHTML += `<span class="star half">★</span>`;
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starHTML += `<span class="star empty">☆</span>`;
    }

    return starHTML;
}


fetchData();
