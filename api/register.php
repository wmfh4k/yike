<?php
/**
 * @Author: WZH
 * @Date:   2017-10-29 01:26:06
 * @Last Modified by:   WZH
 * @Last Modified time: 2017-10-30 00:26:25
 */
$name=$_POST['username'];
$password=$_POST['password'];
$arr=Array("username"=>$name,"password"=>$password);
$res=file_get_contents('login.json');
$karr=json_decode($res,true);
$lenght=count($karr);
array_push($karr,$arr);
$string=json_encode($karr,JSON_UNESCAPED_UNICODE);
$ind="0";
$now;
for ($i=0; $i <$lenght ; $i++) { 
    if ($karr[$i]['username']==$name) {
        $ind="0";
        break;
    }
    else{
       file_put_contents('login.json',$string);
       $ind="1"; 
    }
}
if(file_put_contents('login.json',$string)!=false&&$ind=="1") {
    echo $name;
 }else {
    echo "0";
 }
