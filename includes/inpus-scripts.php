<?php
//function to fetch style and script from respective folders.
function inpus_add_scripts() {
    // adding custom css style
    wp_enqueue_style('inpus-main-style', plugins_url(). '/inpusplugin/css/style.css');
    
    //adding jquery

    wp_enqueue_script('inpus-main-script', plugins_url(). '/inpusplugin/js/main.js');
}

//function to render custom style as soon as wp_enqueue_scripts loads
add_action('wp_enqueue_scripts', 'inpus_add_scripts');
