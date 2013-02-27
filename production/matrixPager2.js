(function( $ ){
	
  $.fn.matrixPager = function( options ) {  

    // Create some defaults, extending them with any options that were provided
	
	var defaults = {
		/* Rows to be displayed */
		rows: 6,
		
		/* Cols to be displayed */		
		cols: 3,
		
		/* Skips a number of elements before finding the element type we want to use */
		selector: null,
		
		/* Delay before starting in ms */
		delayStart: 1000,
		
		/* Delay between each page in ms */
		pause: 2000,
		
		/* Tells each grid element on what to play the start effect */
		triggerStart: 'timer',
		
		/* Effect valid only on timer mode (for now) */
		effect: 'snakeLeft',
		
		/* Tells each grid element on what to play start the end effect */
		triggerEnd: 'click',
		
		/* Set what effect is applied to triggerStart */
		bindTriggerStart: $.noop,
		
		/* Set what effect is applied to triggerEnd */
		bindTriggerEnd: $.noop,		
		
		/* Self explanatory */
		onCreate: $.noop,
		
		/* Self explanatory */
		debug: false
	};
		
    var options = $.extend(defaults, options);
	var raster = [];

    return this.each(function() {

		var $this = $(this);
		var $p = 1;
		var $b = 1;
		
		var handle_pager, handle_matrix, started = false;
		
		
		function pager(){
			
			$b = 1;
			console.log ('change here');
			console.warn($p);
			$p++;

			if (started==false) {
				started = true;
				
				handle_matrix = setInterval (matrix_write, 500);
				
			
			} 			

			

		} /* end pager */
		
		function matrix_write(){
			
			animstarted = false;
			console.log($b);
			while ( $b < 10 ){
				
				$('.box').each(function(){

					if (!animstarted){
						animstarted = true;
						$(this).animate({'opacity':0},100, function(){
							$b = 11;
						});
					}
				});
			
					
			
			}
			started = false;
			clearInterval(handle_matrix);
			
		}
		
		pager()
		
    });

  };
})( jQuery );