// Stripe API Anahtarınızı burada tanımlayın
const stripe = Stripe('STRIPE_PUBLIC_KEY'); // Buraya kendi Stripe Public Key'inizi koymalısınız
const elements = stripe.elements();

// Kart elemanını oluşturun ve formda kullanın
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Hata mesajları için DOM referansı
const cardErrors = document.getElementById('card-errors');

// Kart elemanına gerçek zamanlı doğrulama ekleyin
cardElement.on('change', function(event) {
    if (event.error) {
        cardErrors.textContent = event.error.message;
    } else {
        cardErrors.textContent = '';
    }
});

// Modal açma ve kapatma işlevleri
const modal = document.getElementById('kvkk-modal');
const kvkkLink = document.getElementById('kvkk-link');
const closeModal = document.getElementById('close-modal');

// Kullanıcı KVKK linkine tıklayınca modal açılır
kvkkLink.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = 'block';
});

// Kullanıcı kapatma simgesine tıklayınca modal kapanır
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Kullanıcı modal dışına tıklarsa modal kapanır
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// KVKK kutucuğu kontrolü ve buton devre dışı bırakma
const kvkkCheckbox = document.getElementById('kvkk-checkbox');
const submitButton = document.getElementById('submit-button');

// Sayfa yüklendiğinde butonu devre dışı bırak
window.addEventListener('load', function() {
    submitButton.disabled = true;
});

// KVKK checkbox durumuna göre butonu etkinleştir
kvkkCheckbox.addEventListener('change', function() {
    submitButton.disabled = !kvkkCheckbox.checked;
});

// Form gönderim işlemi
const form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // KVKK checkbox kontrolü
    if (!kvkkCheckbox.checked) {
        alert('Lütfen KVKK Aydınlatma Metnini okuyup onayladığınıza dair kutucuğu işaretleyin.');
        return;
    }

    // Ödeme bilgilerini Stripe'a gönder
    stripe.createToken(cardElement).then(function(result) {
        if (result.error) {
            cardErrors.textContent = result.error.message;
        } else {
            handleStripeToken(result.token);
        }
    });
});

// Stripe token'i ile sunucuya POST isteği gönder
function handleStripeToken(token) {
    fetch('charge.php', { // PHP dosyanızın yolu
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Ödeme başarılı!');
            window.location.href = '/success';
        } else {
            alert('Ödeme başarısız: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Sunucu Hatası:', error);
        alert('Bir hata oluştu, lütfen tekrar deneyin.');
    });
}
