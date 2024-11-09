<?php
// Veritabanı bağlantısını dahil et
include 'db_connection.php';

// Giriş loglarını çekmek için SQL sorgusu
$sql = "SELECT users.email, login_logs.login_time FROM login_logs
        JOIN users ON login_logs.user_id = users.id
        ORDER BY login_logs.login_time DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Giriş Logları:</h2>";
    echo "<table border='1'>
            <tr>
                <th>E-posta</th>
                <th>Giriş Zamanı</th>
            </tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row["email"]) . "</td>
                <td>" . htmlspecialchars($row["login_time"]) . "</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "Giriş logu bulunamadı.";
}

$conn->close();
?>
