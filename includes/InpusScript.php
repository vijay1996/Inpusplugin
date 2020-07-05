<?php
namespace includes;
//class to fetch style and script from respective folders.
class EnqueueStyleScript {
    function __construct() 
    {
        add_action('wp_enqueue_scripts', [$this, 'inpus_add_scripts']);
    }
    //function to render custom style as soon as wp_enqueue_scripts loads
    function inpus_add_scripts() {
        // adding custom css style
        wp_enqueue_style('inpus-main-style', plugins_url(). '/inpusplugin/css/style.css');
        
        //adding jquery
        wp_enqueue_script('inpus-main-script', plugins_url(). '/inpusplugin/js/main.js');
    }
}

// class to register widget.
class RegisterWidget {
    function __construct() 
    {
        add_action('widgets_init', [$this, 'register_inpus'],20);
    }
    function register_inpus()
    {
        register_widget('Inpus_widget');
    }
}