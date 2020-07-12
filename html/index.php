<?php include_once '../../../../wp-load.php' ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="<?php get_stylesheet_uri() ?>">
    <title><?php echo bloginfo('name'); ?> - <?php echo bloginfo('description'); ?></title>
</head>
<body>
    <div id="siteDetails">
        <div id="heading"><a href="<?php echo bloginfo('url') ?>"><?php echo bloginfo('name'); ?> Users</a></div>
        <div id="tagline"><?php echo bloginfo('description'); ?></div>
    </div>
    <div class='inpus-main'>
        <button id='inpus-back'>Back</button>
		<a id='inpus-reload-list'><button>Reload Data</button></a>
		<div id='inpus-display-1'></div>
        <div id='inpus-display-2'></div>
    </div>
    <br>
    <script src="../js/main.js"></script>
</body>
</html>