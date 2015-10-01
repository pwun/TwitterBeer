(function($){
	AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
	init: function () {
		  var self = this;
		  $(this.target).find('input').bind('keydown', function(e) {
		    if (e.which == 13) {
		      var value = $(this).val();
		      if (value && self.set(value)) {
						localStorage["input"] = value;
		        self.doRequest();
		      }
		    }
		  });
		},
	});
})(jQuery);
