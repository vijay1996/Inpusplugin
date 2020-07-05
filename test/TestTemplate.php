<?php
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