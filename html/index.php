<?php include_once '../../../../wp-load.php' ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <title>Document</title>
</head>
<body>
    <div id="siteDetails">
        <div id="heading"><?php echo bloginfo('name'); ?> Users</div>
        <div id="tagline"><?php echo bloginfo('description'); ?></div>
    </div>
    <div class='inpus-main'>
		<button id='inpus-back'>Back</button>
		<div id='inpus-display-1'></div>
        <div id='inpus-display-2'></div>
        <br>
		<a id='inpus-reload-list'>Reload Data (will reload this page)</a>
	</div>
    <script src="../js/main.js"></script>
</body>
</html>