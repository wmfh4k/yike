<?php
header("Content-Type:text/html;charset=utf-8");
$post=$_POST['data'];
$post=json_encode($post);
 $res=json_decode($post,true);
    echo  $res;
// }
// $errorinfo=json_last_error(); 
//4->语法错
//
?>
