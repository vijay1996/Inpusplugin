<?php
/**
 * Plugin Name:       Inpus Plugin
 * Plugin URI:        https://github.com/vijay1996/Inpusplugin
 * Description:       A plugin to fetch user details
 * Version:           1.0.0
 * Author:            Vijaybhoj Raj C M
 * Author URI:        https://github.com/vijay1996
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

//register the plugin and add stylesheet and script to the main wordpress page.
new \includes\EnqueueStyleScript();
new \includes\RegisterWidget();
