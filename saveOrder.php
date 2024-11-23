<?php
// Veritabanı bağlantısını dahil et
include 'db_connection.php';

// JSON formatında gelen veriyi al
$orderData = json_decode(file_get_contents('php://input'), true);

if ($orderData) {
    $fullName = $orderData['fullName'];
    $address = $orderData['address'];
    $city = $orderData['city'];
    $postalCode = $orderData['postalCode'];
    $country = $orderData['country'];
    $cart = json_encode($orderData['cart']); // Sepeti JSON olarak sakla

    // Veritabanına siparişi kaydet
    $sql = "INSERT INTO orders (full_name, address, city, postal_code, country, cart) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $fullName, $address, $city, $postalCode, $country, $cart);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $stmt->close();
    $conn->close();
}
?>
