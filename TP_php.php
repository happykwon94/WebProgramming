<?php
  $file = fopen("TP_data.txt", "a");

  $userName = $_POST["user"];
  $comment = $_POST["comment"];

  $savedText = $userName." | ".$comment." | ";

  fwrite($file, $savedText);
  fclose($file);
  echo "true";
 ?>
