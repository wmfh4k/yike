<?php
header("Content-Type:text/html;charset=utf-8");
$username=$_GET['username'];
$password=$_GET['password'];
$result = file_get_contents("login.json");
$res=json_decode($result,true);
//var_dump($result);
$lengh=count($res);
//var_dump($res);     
$ind=0;
for ($i=0; $i< $lengh; $i++){ 
    if ($res[$i]['username']==$username&&$res[$i]['password']==$password){
        $ind=$i;
        break;
    }
    else{
        $ind=$lengh;
        continue;
    }
}
 if($ind==$lengh){
    echo "0";
 }else{
    echo json_encode($res[$ind]);
 }
 

?>