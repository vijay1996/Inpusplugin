<?php
/*
    This file contains the two test cases that checks if two hooks used to add this widget to wordpress actually functions properly.
*/
namespace test;
require 'TestTemplate.php';
require 'includes/InpusScript.php';

class InpusHooksTest extends TestClass
{
    /** @test */
    public function testStyleScriptHooks () 
    {
        new \includes\EnqueueStyleScript();
        self::assertTrue( has_action('wp_enqueue_scripts') );
    }
    /** @test */
    public function testWidgetRegistrationHook () 
    {
        new \includes\RegisterWidget();
        self::assertTrue( has_action('widgets_init') );
    }
}