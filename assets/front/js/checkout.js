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
    event.preventDefault(); // Sayfa yenilemeyi engelle
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

// Form gönderim işlemi
const form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // KVKK checkbox kontrolü
    const kvkkCheckbox = document.getElementById('kvkk-checkbox');
    if (!kvkkCheckbox.checked) {
        alert('Lütfen KVKK Aydınlatma Metnini okuyup onayladığınıza dair kutucuğu işaretleyin.');
        return; // İşleme devam etmeyin
    }

    // Ödeme bilgilerini Stripe'a gönder
    stripe.createToken(cardElement).then(function(result) {
        if (result.error) {
            // Hata varsa kullanıcıya göster
            cardErrors.textContent = result.error.message;
        } else {
            // Stripe token'i ile sunucuya gönderilecek formu işleyin
            handleStripeToken(result.token);
        }
    });
});

// Stripe token'i ile sunucuya POST isteği gönder
function handleStripeToken(token) {
    // Tokeni sunucuya gönderme işlemi
    fetch('/charge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token.id
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.success) {
            alert('Ödeme başarılı!');
            window.location.href = '/success';  // Başarılı sayfasına yönlendirin
        } else {
            alert('Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
        }
    });
}
