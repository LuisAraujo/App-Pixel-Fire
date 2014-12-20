'use strict';

/*
* App PIXEL FIRE 
* App for paint in pixel art for Firefox Os
*
* Author: Luis Araujo
* Contact: luisaraujo.ifba@gmail.com
* GitHub: github.com/LuisAraujo
*
*/

const PENCEL = 1;
const ERASER = 2;

var colorSelected;
var matrizImage;
var tool;
var rbg_target;
var fileName;
var canvas;
var namefile;

$('window').ready(function() {
	//block screen
	window.screen.mozLockOrientation("portrait");
	//initializing app
	init();
	//Open database
	openDb(function(){});
}); 


