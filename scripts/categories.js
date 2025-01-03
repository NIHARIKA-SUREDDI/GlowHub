let container = document.getElementById("container");
let bagContainer = document.getElementById("bag-container");

async function fetchData() {
    try {
        let res = await fetch("https://stump-humorous-gorgonzola.glitch.me/product");
        let data = await res.json();
        if (data && typeof data === 'object') {
            data = Object.values(data);
        }
        
        
        data = data.filter(element => element !== null);
       

        setupFilters(data); 
        appendData(data); // Display all products initially

       
        document.getElementById("filter-price").addEventListener("click", () => applyPriceFilter(data));
    } catch (err) {
        console.error(err);
    }
}


// Function to display the cards on the page
function appendData(data) {
    container.innerHTML = ""; // Clear previous content
    data.forEach((product) => container.append(createCard(product)));
}

// Function to create a product card
function createCard(product) {
    console.log({product});
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
        
        
        let bagProducts;
        const storedBag = localStorage.getItem("bag");
        try {
            bagProducts = storedBag ? JSON.parse(storedBag) : [];
        } catch (e) {
            console.error("Error parsing bag from localStorage:", e);
            bagProducts = [];
        }
        bagProducts.push(product);
        console.log('ll',bagProducts);
        // Save product name to localStorage
        localStorage.setItem("bag", JSON.stringify(bagProducts));
        // Redirect to the product details page
        // window.location.href = "categories.html";
    });

    const title = document.createElement("h2");
    title.textContent = product.productname;
    title.classList.add("product-title");

    const price = document.createElement("p");
    price.textContent = `MRP: ₹${product.price}`;

    //

    //
    const rating = document.createElement("div");
    rating.classList.add("rating");
    rating.innerHTML = renderStars(product.Rating) + `<span>${product.Rating}</span>`;

    card.append(image, title, price, rating, button);

    return card;
}
//








// Function to set up category filter buttons
function setupFilters(data) {
    document.querySelector(".btn-all").addEventListener("click", () => appendData(data));
    document.querySelector(".btn-makeup").addEventListener("click", () => filterCategory(data, "Makeup"));
    document.querySelector(".btn-skincare").addEventListener("click", () => filterCategory(data, "Skincare"));
    document.querySelector(".btn-Haircare").addEventListener("click", () => filterCategory(data, "Haircare"));
    document.querySelector(".btn-Fragrance").addEventListener("click", () => filterCategory(data, "Fragrance"));
   
}

// Function to filter products by category
function filterCategory(data, category) {
    const filteredData = data.filter((product => product.category === category));
    appendData(filteredData);
}

document.getElementById("filter-price").addEventListener("click", () => applyPriceFilter(data));

// Function to apply price range filter
function applyPriceFilter(data) {
    const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);

    // Ensure product prices are numbers
    const filteredData = data.filter((product) => {
        const productPrice = parseFloat(product.price);
        return productPrice >= minPrice && productPrice <= maxPrice;
    });

    
    console.log("Filtered Data:", filteredData);
    appendData(filteredData); // 
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
fetchData()

