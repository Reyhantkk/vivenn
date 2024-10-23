document.addEventListener('DOMContentLoaded', loadCartItems);

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    let totalAmount = 0;

    // Sepetteki her ürünü tabloya ekle
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.img}" alt="${item.name}" width="50">
                ${item.name}
            </td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>₺${(parseFloat(item.price.replace('₺', '')) * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart('${item.name}')">Sil</button></td>
        `;
        cartItemsContainer.appendChild(row);

        // Toplam tutarı hesapla
        totalAmount += parseFloat(item.price.replace('₺', '')) * item.quantity;
    });

    // Toplam tutarı güncelle
    document.getElementById('total-amount').innerText = `₺${totalAmount.toFixed(2)}`;
}

function removeFromCart(productName) {
    // Ürünü sepetten kaldır
    cart = cart.filter(item => item.name !== productName);

    // Sepeti localStorage'a tekrar kaydet
    localStorage.setItem('cart', JSON.stringify(cart));

    // Sepet içeriğini güncelle
    location.reload();
}

function proceedToCheckout() {
    window.location.href = 'checkout.html'; // Kullanıcıyı ödeme sayfasına yönlendir
}