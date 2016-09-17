<?php

$output = '';
switch($_REQUEST['request']){
    case 'test':
        $output = 'test successful';
        break;
    default: $output = 'unrecognized request';
}

echo $output;