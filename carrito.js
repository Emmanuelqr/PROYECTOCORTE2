document.addEventListener('DOMContentLoaded', renderCart);

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-container');
    container.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const title = item.title || 'Producto sin nombre';
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        const img = item.img || 'no-image.png';

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${img}" onerror="this.src='images/no-image.png';">
            <div class="cart-details">
                <h4>${title}</h4>
                <span>$${price.toFixed(2)}</span>
            </div>
            <div class="cart-controls">
                <button onclick="changeQty(${index}, -1)"><i class="fas fa-minus-circle"></i></button>
                <span id="qty-${index}">${quantity}</span>
                <button onclick="changeQty(${index}, 1)"><i class="fas fa-plus-circle"></i></button>
                <button onclick="removeItem(${index})" class="remove-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;

        container.appendChild(cartItem);

        totalPrice += price * quantity;
    });

    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}

window.changeQty = function(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;

    if(cart[index].quantity <= 0) cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    window.location.reload();
};

window.removeItem = function(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    window.location.reload();
};

document.getElementById('checkout-btn').addEventListener('click', function(){
    alert('Procediendo al pago...');
});

