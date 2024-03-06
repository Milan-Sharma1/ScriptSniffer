<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdfFile'])) {
    $targetDir = "../../cgi-bin/PyMain/uploads/";
    $targetFile = $targetDir . "uploads.pdf";
    
    if (move_uploaded_file($_FILES['pdfFile']['tmp_name'], $targetFile)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $targetFile = "../../cgi-bin/PyMain/uploads/uploads.pdf";
    
    if (file_exists($targetFile)) {
        if (unlink($targetFile)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to delete file"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "File not found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
?>
