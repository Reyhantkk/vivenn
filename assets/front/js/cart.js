document.addEventListener('DOMContentLoaded', loadCartItems);

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sepet ürünlerini yükleme fonksiyonu
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

// Ürün silme işlemi
function removeFromCart(productName) {
    // Ürünü sepetten kaldır
    cart = cart.filter(item => item.name !== productName);

    // Sepeti localStorage'a tekrar kaydet
    localStorage.setItem('cart', JSON.stringify(cart));

    // Sepet içeriğini güncelle
    location.reload();
}

// Ödeme yap butonuna tıklanınca adres formunu göster
function showAddressForm() {
    const addressFormContainer = document.getElementById('address-form-container');
    addressFormContainer.style.display = 'block'; // Adres formunu görünür yap
}

// Adres formu gönderildiğinde işlemleri yap
document.getElementById('address-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Sayfa yenilemesini engelle

    // Adres bilgilerini al
    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const country = document.getElementById('country').value;

    // Adres bilgilerini kontrol et
    if (!fullName || !address || !city || !postalCode || !country) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    // Adres bilgilerini işleme alabilir veya sunucuya gönderebilirsiniz
    console.log({
        fullName,
        address,
        city,
        postalCode,
        country
    });

    // Ardından ödeme sayfasına yönlendirme işlemi yapılabilir
    alert('Adres onaylandı! Şimdi ödeme sayfasına yönlendirileceksiniz.');
    window.location.href = 'checkout.html'; // Ödeme sayfasına yönlendir
});
