<?php

function getContent(){
	echo '<h1>dumpfile</h1><hr>';
	echo '<h2>get</h2>';
	var_dump($_GET);
	echo '<hr>';
	echo '<h2>post</h2>';
	var_dump($_POST);
	echo '<hr>';
}
?>