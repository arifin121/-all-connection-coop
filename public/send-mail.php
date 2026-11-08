<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    $data = $_POST;
}

$companyName    = isset($data['companyName']) ? trim(strip_tags($data['companyName'])) : '';
$personInCharge = isset($data['personInCharge']) ? trim(strip_tags($data['personInCharge'])) : '';
$email          = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$phone          = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$inquiryType    = isset($data['inquiryType']) ? trim(strip_tags($data['inquiryType'])) : '';
$message        = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if ($companyName === '' || $personInCharge === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => ' Missing required fields']);
    exit;
}

$to = 'info@all-connection.jp';
$subject = '【Webお問い合わせ】' . $inquiryType . '（' . $companyName . ' 様）';

$body  = "オールコネクション協同組合 公式Webサイトよりお問い合わせがありました。\n\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$body .= "■ 貴社名・法人名: " . $companyName . "\n";
$body .= "■ ご担当者名: " . $personInCharge . " 様\n";
$body .= "■ メールアドレス: " . $email . "\n";
$body .= "■ 電話番号: " . $phone . "\n";
$body .= "■ お問い合わせ種別: " . $inquiryType . "\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$body .= "【お問い合わせ内容】\n" . $message . "\n\n";
$body .= "--------------------------------------------------------\n";
$body .= "送信日時: " . date('Y-m-d H:i:s') . "\n";

$headers  = "From: info@all-connection.jp\r\n";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: " . $email . "\r\n";
}
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mb_language('Japanese');
mb_internal_encoding('UTF-8');

$sent = @mb_send_mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false]);
}
