jquery.wigglegram.js
====================

A jQuery plugin for creating "[wigglegrams](http://knowyourmeme.com/memes/wigglegrams)." Inspired by [Jeffrey Friedl's](http://regex.info/blog/category/pretty-photos/wigglegrams) much superior work.

Examples
--------

Examples can be viewed at http://jeremyneiman.com/wigglegrams.

Usage
-----

In your HTML include all the images for each wigglegram in their own div:

	<div class="wigglegram" id="wigglegram0">
		<img src="1.jpg"/>
		<img src="2.jpg"/>
		<img src="3.jpg"/>
	</div>
	

Then in your javascript:

	$(function() {
		$.wigglegram("#wigglegram0");
	});
	
This will create a wigglegram with default settings.  Several options are available:

	$.wigglegram("#wigglegram0", {loop: true, sensitivity: .5});
	
**loop** will make the array of images circular. The default is false.
**sensitivity** will affect how far the mouse has to move to change images.  The higher the number, the **less** sensitive it will be.  At 1 the mouse must move the width of the image to cycle through all the frames.  The default is .25.

The wigglegram can also be set to automatically cycle through the frames:

	$.wigglegram("#wigglegram1", {auto: true, rate: 10, clockwise: false});
	
**auto** will make the wigglegram automatically cycle through the images.  The default is false.
**rate** specifies the FPS (frames-per-second) to cycle through the images. The default is 30.
**clockwise** specifies the direction to cycle through the images.  The actual direction (clockwise or counter-clockwise) depends on the order of your images.  The clockwise setting simply increments if true, and decrements if false.  The default is true.

Multiple wigglegrams can coexist on the same page.  To instantiate multiple using the same settings, a different selector (such as the class) can be used:

	$.wigglegram(".wigglegram", {loop:true, sensitivity: 1, auto: true, rate: 20, clockwise: false});
	
License
--------
Licensed under the WTFPL.  

Copyright
---------
Copyright 2013 Jeremy Neiman


	
	
	
