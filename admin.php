<?php
// Veritabanı bağlantısını dahil edin
include 'db_connection.php'; // Veritabanı bağlantı dosyanız

// Siparişleri veritabanından çek
$sql = "SELECT * FROM orders"; // 'orders' tablosu siparişlerin saklandığı yer
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alınan Siparişler</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Alınan Siparişler</h1>
    <table>
        <thead>
            <tr>
                <th>Ad Soyad</th>
                <th>Adres</th>
                <th>Şehir</th>
                <th>Posta Kodu</th>
                <th>Ülke</th>
                <th>Sepet İçeriği</th>
                <th>Tarih</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                // Her siparişi bir tablo satırı olarak göster
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['full_name'] . "</td>";
                    echo "<td>" . $row['address'] . "</td>";
                    echo "<td>" . $row['city'] . "</td>";
                    echo "<td>" . $row['postal_code'] . "</td>";
                    echo "<td>" . $row['country'] . "</td>";
                    echo "<td>" . $row['cart'] . "</td>";
                    echo "<td>" . $row['created_at'] . "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='7'>Hiç sipariş bulunamadı.</td></tr>";
            }
            ?>
        </tbody>
    </table>
</body>
</html>
