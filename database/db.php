<?php
$conn = mysqli_connect("localhost:4306","root","","cinema_site");
if(mysqli_connect_errno()){
 echo "Failed to connect MySqli:" . mysqli_connect_error();
}
?>