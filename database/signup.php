<?php
require 'db.php';
if($_SERVER['REQUEST_METHOD']=='POST'){
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// user insertion
$sql = "insert into user (username,email,password) values ('$username','$email','$password')";

if(mysqli_query($conn,$sql)){
   header("Location: ../signin.html");
   exit();
}else{
    echo "Error: ". $sql . "<br>". mysqli_error($conn);
}

}

$conn->close();
?>