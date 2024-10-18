const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here'); // Stripe'in secret key'i

const app = express();
app.use(bodyParser.json()); // JSON verileri almak için

// Ödeme işlemini yapan POST endpoint
app.post('/charge', async (req, res) => {
    const { stripeToken, amount } = req.body; // Frontend'den gelen stripeToken ve ödeme miktarı

    try {
        // Ödeme işlemini gerçekleştir
        const charge = await stripe.charges.create({
            amount: amount, // Ödeme miktarı (örneğin 5000 = 50.00 TL)
            currency: 'usd', // Para birimi (TL için 'try' kullanılabilir)
            source: stripeToken, // Frontend'den gelen token
            description: 'Sepet Ödemesi'
        });

        // Ödeme başarılıysa yanıt gönder
        res.json({ success: true, message: 'Ödeme başarılı!' });
    } catch (error) {
        // Hata durumunda yanıt gönder
        console.error('Ödeme hatası:', error);
        res.status(500).json({ success: false, message: 'Ödeme başarısız. Lütfen tekrar deneyin.' });
    }
});

// Sunucuyu başlat
app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor');
});
