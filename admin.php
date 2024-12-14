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
                <th>Müşteri Numarası</th>
                <th>Ad Soyad</th>
                <th>Telefon Numarası</th>
                <th>Adres</th>
                <th>Şehir</th>
                <th>Posta Kodu</th>
                <th>Ülke</th>
                <th>Ürün Adı</th>
                <th>Ürün Adedi</th>
                <th>Tarih</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['customer_id'] . "</td>";
                    echo "<td>" . $row['full_name'] . "</td>";
                    echo "<td>" . $row['phone'] . "</td>";
                    echo "<td>" . $row['address'] . "</td>";
                    echo "<td>" . $row['city'] . "</td>";
                    echo "<td>" . $row['postal_code'] . "</td>";
                    echo "<td>" . $row['country'] . "</td>";
                    echo "<td>" . $row['product_name'] . "</td>";
                    echo "<td>" . $row['quantity'] . "</td>";
                    echo "<td>" . $row['created_at'] . "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='10'>Hiç sipariş bulunamadı.</td></tr>";
            }
            ?>
        </tbody>
    </table>
</body>
</html>
