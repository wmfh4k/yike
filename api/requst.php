<?php
/**
 * @Author: WZH
 * @Date:   2017-10-29 23:21:36
 * @Last Modified by:   WZH
 * @Last Modified time: 2017-10-30 01:47:48
 */
header("Content-Type:text/html;charset=utf-8");

$resut=file_get_contents('collection.json');
$arr=explode('',$resut);
var_dump($arr);