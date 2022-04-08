<?php
     $host = 'localhost';
    $user = 'jkr1230';
    $pw = 'gusdn13^';
    $dbname = 'jkr1230';

    // Create connection
    $conn = new mysqli($host, $user, $pw, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    
    // sql to create table
    $sql = "CREATE TABLE todo (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(30) NOT NULL,
    complete VARCHAR(30) NOT NULL,
    body VARCHAR(50)
    )";
    
    if (mysqli_query($conn, $sql)) {
        echo "Table todo created successfully";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }

    $conn->close();
?>