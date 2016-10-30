$( document ).ready(function() {

	var wall = new Freewall("#gallery");
	wall.reset({
		selector: '.cell',
		animate: true,
		cellW: function(width) {

			var NumColums = 4;
			if(width < 768)
			{
				NumColums = 2;
			}

      var cellWidth = width / NumColums;
      return cellWidth - 10;
    },
		onResize: function() {
			wall.fitWidth();
		}
	});
	
	wall.fitWidth();

	$(window).trigger("resize");
});