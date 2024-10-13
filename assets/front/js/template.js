// Sepet verilerini localStorage'dan yükleyin veya boş bir dizi oluşturun
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

// Sayfa yüklendiğinde sepet ikonunu güncelleyin
document.addEventListener('DOMContentLoaded', updateCartIcon);
