const cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const productCard = e.target.closest('.product-card');
        const id = productCard.getAttribute('data-id');
        const title = productCard.querySelector('.product-title').textContent;
        const price = parseFloat(productCard.getAttribute('data-price'));
        const imgSrc = productCard.querySelector('.product-img').src;

        addToCart({ id, title, price, img: imgSrc });
        animateProduct(imgSrc, e.pageX, e.pageY);
    });
});

function addToCart(product) {
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
        exist.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        countElement.style.display = 'block';
        countElement.textContent = totalItems;
    } else {
        countElement.style.display = 'none';
    }
}

function animateProduct(imgSrc, startX, startY) {
    const flyingImg = document.createElement('img');
    flyingImg.src = imgSrc;
    flyingImg.classList.add('flying-img');
    document.body.appendChild(flyingImg);

    flyingImg.style.top = `${startY}px`;
    flyingImg.style.left = `${startX}px`;

    const cartIcon = document.querySelector('.cart-icon');
    const cartRect = cartIcon.getBoundingClientRect();

    setTimeout(() => {
        flyingImg.style.top = `${cartRect.top}px`;
        flyingImg.style.left = `${cartRect.left}px`;
        flyingImg.style.width = '20px';
        flyingImg.style.height = '20px';
        flyingImg.style.opacity = '0.5';
    }, 10);

    setTimeout(() => document.body.removeChild(flyingImg), 700);
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.removeItem('cart');
        window.location.href = "index.html";
    }).catch((error) => {
        alert("Error al cerrar sesión: " + error.message);
    });
});


