let cartItemsContainer = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <img src="${product.productimage}" alt="${product.productname}" />
            <p>${product.productname}</p>
            <p>₹${product.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(productElement);
        total += parseFloat(product.price);
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to Checkout!');
    localStorage.removeItem('cart'); // Clear cart after checkout
    window.location.href = 'categories.html';
});

// Display items when page loads
displayCartItems();
