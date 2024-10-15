let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sepete ürün ekleme işlevi
function addToCart(button) {
    const product = button.closest('.product');
    const productName = product.querySelector('h2').innerText;
    const productPrice = product.querySelector('p').innerText;
    const productImgSrc = product.querySelector('img').src;

    // Ürün bilgilerini bir nesne olarak oluşturun
    const productInfo = {
        name: productName,
        price: productPrice,
        img: productImgSrc,
        quantity: 1
    };

    // Sepette aynı ürün var mı kontrol edin
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        // Ürün zaten varsa miktarını artırın
        cart[existingProductIndex].quantity += 1;
    } else {
        // Ürün yoksa sepete ekleyin
        cart.push(productInfo);
    }

    // Sepeti localStorage'a kaydedin
    localStorage.setItem('cart', JSON.stringify(cart));

    // Sepet ikonu güncelleyin
    updateCartIcon();

    // Sepet mesajını dinamik olarak gösterin
    showCartMessage(`${productName} sepete eklendi!`);
}

// Sepet ikonu güncelleme işlevi
function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return;

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartIcon.dataset.count = itemCount;

    if (itemCount > 0) {
        cartIcon.classList.add('has-items');
    } else {
        cartIcon.classList.remove('has-items');
    }
}

// Dinamik sepet mesajını gösterme
function showCartMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'cart-message';
    messageBox.innerText = message;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 2000);
}

// Ürünleri filtreleme fonksiyonu
function filterProducts(criteria) {
    const products = Array.from(document.querySelectorAll('.product'));
    products.sort((a, b) => {
        switch (criteria) {
            case 'price-asc':
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            case 'price-desc':
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            case 'name-asc':
                return a.dataset.name.localeCompare(b.dataset.name);
            case 'name-desc':
                return b.dataset.name.localeCompare(a.dataset.name);
            case 'stock':
                return a.dataset.stock === 'true' ? -1 : 1;
            default:
                return 0;
        }
    });
    
    const container = document.querySelector('.products-container');
    container.innerHTML = '';
    products.forEach(product => container.appendChild(product));
}

// Sayfa yüklendiğinde sepet ikonunu güncelleyin
document.addEventListener('DOMContentLoaded', updateCartIcon);