(function( $ ) {
 
    $.fn.showSpinner = function(text) {    	
    	this.html('<img src="/assets/img/ajax-loader.gif">');
			this.show();
    };
 
    $.fn.hideSpinner = function() {
			this.hide();
    };
}( jQuery ));