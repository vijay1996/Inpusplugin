<?php
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