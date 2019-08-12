<?php
  $file = fopen("TP_data.txt", "r");

  $infoArray = file("TP_data.txt");

  $count = count($infoArray);

  for($i = 0; $i<$count; $i++){
    echo $infoArray[$i];
  }

  fclose($file);
 ?>
