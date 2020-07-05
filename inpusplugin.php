<?php
/**
 * Plugin Name:       Inpus Plugin
 * Plugin URI:        https://www.wrapyourbook.com
 * Description:       Will show youtube subscribers
 * Version:           1.0.0
 * Author:            Vijaybhoj Raj C M
 * Author URI:        https://wrapyourbook.com
 */

 // to block entry by directly entering the url of the plugin.
if (!defined('ABSPATH'))
{
    exit;
}

// to fetch the include files into the main plugin file.
require_once (plugin_dir_path(__FILE__).'/includes/InpusScript.php');

// to fetch the class from includes to the main plugin file.
require_once (plugin_dir_path(__FILE__).'/includes/InpusClass.php');

//register the plugin.

/*
function register_inpus() {
    register_widget('Inpus_widget');
}
add_action('widgets_init', 'register_inpus');
*/
new \includes\EnqueueStyleScript();
new \includes\RegisterWidget();