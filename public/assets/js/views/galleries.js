$( document ).ready(function() {

	var wall = new Freewall("#gallery");
	wall.reset({
		selector: '.cell',
		animate: true,
		cellW: 420,
		cellH: 280,
		onResize: function() {
			wall.fitWidth();
		}
	});
	
	wall.fitWidth();

	$(window).trigger("resize");
});