<?php
require_once('vendor/autoload.php'); // Composer kullanıyorsanız bu satır gereklidir
\Stripe\Stripe::setApiKey('sk_test_YOUR_SECRET_KEY'); // Stripe Secret Key

header('Content-Type: application/json');

// Tarayıcıdan gelen JSON verisini alın
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['token'])) {
    $token = $input['token'];

    try {
        // Stripe ile ödeme işlemi başlat
        $charge = \Stripe\Charge::create([
            'amount' => 5000, // Ödeme tutarı kuruş cinsinden (50 TL = 5000)
            'currency' => 'try',
            'source' => $token, // Tarayıcıdan gelen token
            'description' => 'Ödeme işlemi PHP ile'
        ]);

        // MySQL veritabanına başarılı işlemi kaydet
        $mysqli = new mysqli('localhost', 'root', '', 'stripe_db'); // Veritabanı bilgilerinizi ayarlayın
        if ($mysqli->connect_error) {
            die("Veritabanı bağlantı hatası: " . $mysqli->connect_error);
        }

        $stmt = $mysqli->prepare("INSERT INTO payments (amount, currency, description, stripe_charge_id) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isss", $charge->amount, $charge->currency, $charge->description, $charge->id);
        $stmt->execute();

        echo json_encode(['success' => true]);
    } catch (\Stripe\Exception\ApiErrorException $e) {
        // Stripe hatası
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Token bulunamadı.']);
}
?>
