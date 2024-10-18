// Stripe anahtarını kullanarak stripe nesnesi oluştur
var stripe = Stripe('your-publishable-key-here'); // Stripe’in test publishable anahtarını ekleyin
var elements = stripe.elements();

// Kart elemanını oluştur
var card = elements.create('card');
card.mount('#card-element');

// Hataları göstermek için event listener
card.on('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Form gönderildiğinde
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Stripe ile token oluştur
    stripe.createToken(card).then(function(result) {
        if (result.error) {
            // Hata varsa, mesajı göster
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            // Token oluştuysa sunucuya gönder
            stripeTokenHandler(result.token);
        }
    });
});

function stripeTokenHandler(token) {
    // AJAX ile token'ı sunucuya gönder
    fetch('/charge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stripeToken: token.id,
            amount: 5 // Ödeme miktarını burada belirtebilirsin (örneğin 50.00 TL)
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        // İşlem başarılıysa sonucu göster
        alert('Ödeme başarılı!');
    })
    .catch(function(error) {
        // Hata durumunda mesajı göster
        console.error('Hata:', error);
        alert('Ödeme başarısız. Lütfen tekrar deneyin.');
    });
}
