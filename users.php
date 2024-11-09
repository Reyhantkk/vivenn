<?php
// Veritabanı bağlantısını dahil et
include 'db_connection.php';

// Kullanıcıları çekmek için SQL sorgusu
$sql = "SELECT id, email FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Kayıtlı Kullanıcılar:</h2>";
    echo "<ul>";
    while($row = $result->fetch_assoc()) {
        echo "<li>ID: " . $row["id"]. " - E-posta: " . $row["email"]. "</li>";
    }
    echo "</ul>";
} else {
    echo "Kayıtlı kullanıcı bulunamadı.";
}

$conn->close();
?>
