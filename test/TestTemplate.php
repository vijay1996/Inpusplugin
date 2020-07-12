<?php
/*
    A test class initiated as prescribed in the Monkey Brain documentation, that will add all wordpress functionality without actually loading wordpress.
*/

namespace test;
use PHPUnit\Framework\TestCase;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Brain\Monkey;

class TestClass extends TestCase
{
    use MockeryPHPUnitIntegration;
    
    protected function setup() {
        parent::setup();
        Monkey\setup();
    }

    protected function tearDown() {
        Monkey\tearDown();
        parent::tearDown();
    }
}