<?php
$content = $_POST["events"];
$fileName = "eventdata.txt";

$openedFile = fopen($fileName, 'w');

$fw = fwrite($openedFile, $content);
echo $content . "data received";

fclose($openedFile);
