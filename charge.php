<?php
header('Content-Type: application/json');

$merchant_id = 'YOUR_MERCHANT_ID';
$merchant_key = 'YOUR_MERCHANT_KEY';
$merchant_salt = 'YOUR_MERCHANT_SALT';
$email = 'test@domain.com';
$payment_amount = 100; // Örnek tutar (Kuruş cinsinden)
$currency = "TRY";

// Hash oluştur
$hash_str = $merchant_id . $email . $payment_amount . $merchant_salt;
$paytr_token = base64_encode(hash_hmac('sha256', $hash_str, $merchant_key, true));

$post_data = [
    'merchant_id' => $merchant_id,
    'email' => $email,
    'payment_amount' => $payment_amount,
    'paytr_token' => $paytr_token,
    'currency' => $currency,
    'success_url' => 'https://www.yourwebsite.com/success',
    'fail_url' => 'https://www.yourwebsite.com/fail'
];

// PayTR sunucusuna istek gönder
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.paytr.com/odeme/api");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));

$result = curl_exec($ch);
curl_close($ch);

if ($result) {
    echo json_encode([
        'status' => 'success',
        'iframe_url' => $result
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'PayTR isteği başarısız oldu.'
    ]);
}
?>
