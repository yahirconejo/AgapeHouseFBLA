<?php
 
require("script.php");

if(isset($_GET["list"])){
    $myfile = fopen("listOfPeaple.txt", "r");
    echo fread($myfile,filesize("listOfPeaple.txt"));
    fclose($myfile);
}

if(isset($_POST["info"])){
    $myFile = fopen("listOfPeaple.txt", "a");
    fwrite($myFile, $_POST["info"]);
    fclose($myFile);
}

if(isset($_POST["ranCode"])){
    $postSplit = preg_split("/\,/",$_POST["ranCode"]);
    echo $postSplit[1];
    $msg = "Your Random Code: ".$postSplit[0];
    $msg = wordwrap($msg, 70);
    $response = sendMail($postSplit[1], "Agape House Code", $msg);
    echo $response;
}

if(isset($_POST["emailNews"])){
    $response = sendMail($_POST["emailNews"], "Agape House Newsletter", wordwrap("Thanks for Joining Our Newsletter :)", 70));
    echo $response;
}