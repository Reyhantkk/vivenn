<?php
// Veritabanı bağlantısını ekle
include 'db_connection.php';

// Siparişleri veritabanından çek
$sql = "SELECT orders.id, users.full_name, orders.cart_items, orders.total_price, orders.created_at
        FROM orders
        INNER JOIN users ON orders.user_id = users.id";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Siparişler</title>
</head>
<body>
    <h1>Siparişler</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Kullanıcı</th>
            <th>Sepet</th>
            <th>Toplam Fiyat</th>
            <th>Tarih</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            // Tüm siparişleri listele
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row['id'] . "</td>";
                echo "<td>" . $row['full_name'] . "</td>";
                echo "<td>" . $row['cart_items'] . "</td>"; // JSON formatlı sepet verisi
                echo "<td>₺" . $row['total_price'] . "</td>";
                echo "<td>" . $row['created_at'] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='5'>Kayıtlı sipariş yok.</td></tr>";
        }
        ?>
    </table>
</body>
</html>
