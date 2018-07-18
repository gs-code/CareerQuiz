<?php

require("pushToMautic.php");

// expect POST data to include formId and return
$response = pushMauticForm($_POST, 0, $_SERVER['REMOTE_ADDR']);

?>
