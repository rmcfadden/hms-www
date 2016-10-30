$( document ).ready(function() {
	// Date range
	$('#start').datepicker({
		dateFormat: 'dd.mm.yy',
		prevText: '<i class="fa fa-chevron-left"></i>',
		nextText: '<i class="fa fa-chevron-right"></i>',
		onSelect: function( selectedDate )
		{
			$('#finish').datepicker('option', 'minDate', selectedDate);
		}
	});
	$('#finish').datepicker({
		dateFormat: 'dd.mm.yy',
		prevText: '<i class="fa fa-chevron-left"></i>',
		nextText: '<i class="fa fa-chevron-right"></i>',
		onSelect: function( selectedDate )
		{
			$('#start').datepicker('option', 'maxDate', selectedDate);
		}
	});
});