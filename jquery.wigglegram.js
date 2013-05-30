$.wigglegram = function(selector, options) {
	options = typeof options !== 'undefined' ? options : {};
	options.sensitivity = typeof options.sensitivity !== 'undefined' ? options.sensitivity : .25;
	options.loop = typeof options.loop !== 'undefined' ? options.loop : false;
	options.auto = typeof options.auto !== 'undefined' ? options.auto : false;
	options.rate = typeof options.rate !== 'undefined' ? options.rate : 10;
	options.clockwise = typeof options.clockwise !== 'undefined' ? options.clockwise : true;
	
	$(selector).each(function(index, element) {
		var children = $(element).children();
		children.each(function(cin, cel) {
			if (cin != 0) {
				$(cel).hide();
			} else {
				$(cel).load(function(event) {
					$(element).width($(cel).width());
					$(element).height($(cel).height());
					var sensitivity = ($(cel).width()/children.length)*options.sensitivity;
					
					var canvas = $('<canvas></canvas').attr({'width':$(element).width(),'height':$(element).height()});
					$(element).append(canvas);
					var context = canvas[0].getContext("2d");
					context.drawImage(cel, 0, 0);
					
					$(cel).hide();
					
					var previousX = -1;
					var currentIndex = 0;
					var previousIndex = 0;
					var playing = false;
					
					if (options.auto) {
						playing = true;
						var autoInc = function() {
							if (options.clockwise)
								currentIndex = (currentIndex+1)%children.length;
							else {
								currentIndex = currentIndex -1 ;
								if (currentIndex == -1)
									currentIndex = children.length - 1;
							}
							context.drawImage(children[currentIndex], 0, 0);
						};
						var inter = setInterval(autoInc, 1000/options.rate);
						
						$(element).click(function(event) {
							if (playing) {
								playing = false;
								clearInterval(inter);
							} else {
								playing = true;
								inter = setInterval(autoInc, 1000/options.rate);
							}
						});
						
					}
					
					$(element).mousemove(function(event) {
						if (playing)
							return;
							
						if (previousX == -1) {
							previousX = event.screenX;
						} else if ((event.screenX - previousX > sensitivity)) {
							previousX = event.screenX;
							currentIndex++;
							if (currentIndex == children.length) {
								if (options.loop)
									currentIndex = 0;
								else
									currentIndex--;
							}
							context.drawImage(children[currentIndex], 0, 0);
						} else if ((previousX - event.screenX > sensitivity)) {
							previousX = event.screenX;
							currentIndex--;
							if (currentIndex == -1) {
								if (options.loop)
									currentIndex = children.length - 1;
								else
									currentIndex = 0;;
							}
							context.drawImage(children[currentIndex], 0, 0);
						} else if (Math.abs(previousX - event.screenX) > sensitivity) {
							previousX = event.screenX;
						}
					});
					
				});
			}
		});
	});
};