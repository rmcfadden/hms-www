(function( $ ) {
 
    $.fn.showMessagePanel = function(text) {
    	this.show();
    	$('#message-panel-text').text(text);
    };
 
    $.fn.hideMessagePanel = function() {
    	this.hide();
    };
}( jQuery ));