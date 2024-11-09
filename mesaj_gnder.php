<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'C:/xampp/htdocs/vivenn/PHPMailer/src/Exception.php';
require 'C:/xampp/htdocs/vivenn/PHPMailer/src/PHPMailer.php';
require 'C:/xampp/htdocs/vivenn/PHPMailer/src/SMTP.php';


$mail = new PHPMailer(true);

try {
    // Sunucu ayarları
    $mail->isSMTP();
    $mail->Host = 'davut@vovienn.com'; // SMTP sunucusu


    $mail->SMTPAuth = true;
    $mail->Username = 'davut@vovienn.com'; // SMTP kullanıcı adı
    $mail->Password = 'DAVUTtok-1'; // SMTP şifresi
    
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    $mail->SMTPDebug = 2; // Hata ayıklama seviyesini ayarlar

    
    // Alıcılar
    $mail->setFrom('gonderen@example.com', 'Gönderen Adı');
    $mail->addAddress('davut@vovienn.com', 'Alıcı Adı');

    // İçerik
    $mail->isHTML(true);
    $mail->Subject = 'Konu';
    $mail->Body    = 'Mesaj içeriği';

    $mail->send();
    echo 'Mesaj başarıyla gönderildi';
} catch (Exception $e) {
    echo "Mesaj gönderilemedi. Hata: {$mail->ErrorInfo}";
}
?>
