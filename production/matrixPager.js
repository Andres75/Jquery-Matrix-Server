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
		pause: 5000,
		
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

	function pagerDo($this, $method){
		
		$currpage = 2;
	
		function pageit(){
			
				
			$src = $this.find('.source');
			$dst = $this.find('.destination').css('display','normal');
			$l = $src.length;
			mi = 0;

			function snakeLeft(){
					var $s = $src.eq(mi);
					var $d = $dst.eq(mi);
					console.log('animating '+mi);
					$s.animate({opacity:0},200, function(t){
						//$d.animate({opacity:1},200);
						$d.after($(this)).removeClass('destination').addClass('source');
						$(this).css('opacity',1).removeClass('source').addClass('destination');
					});
					//$s.hide();
					mi++;
					if (mi < $l) {
						//snakeLeft();
						setTimeout(snakeLeft,125);
					}
			}


							
			switch ($method){
				case 'snakeLeft':
					snakeLeft();
					break;
			}


			//alert('s');
//			$('.matrixPager-row li').each(function(){
//				
//				$mdst = $(this).find('.destination');
//				$msrc = $(this).find('.source');
//				$msrc.before($mdst).removeClass('source').addClass('destination').css('opacity',1);
//				$mdst.removeClass('destination').addClass('source')
//			
//			})

			
			if ($currpage == $pages) $currpage = 1; else $currpage++;
			
			startPosition = ((options.rows*options.cols)*$currpage)-options.rows*options.cols;
			
			var p = 0;
			
			$this.find('.destination').each(function(element,index){
				
				$(this).html(raster[startPosition + p]);
				p++;
				
			});
			
			setTimeout(pageit,  options.pause);
			
		}
		
		pageit();
		
	}

    return this.each(function() {

		var $this = $(this);
		
		if (!options.selector){
				$elmtype = $this.find(':first-child').prop('tagName').toLowerCase();
				if (options.debug) console.log($elmtype);
				$collection = $this.children($elmtype);
		} else {
				$collection = $this.find(options.selector);
		}
					
		/* Prepare the pager */
		$nelm  = $collection.length;
		$pages = Math.floor($nelm / (options.rows * options.cols));
		$rem   = $nelm % (options.rows * options.cols);
		
		/* Create PANEL */
		var $panel = '';
		
		if ($rem != 0) {
			
			if (options.debug){
				console.log('number of elements -> '+$nelm);
				console.log('pages -> '+$pages);
				console.log('remaining-> '+$rem);
			}
			/* Set up an extra page to handle all elements */
			
			$pages++;
			$diffelements = (options.rows * options.cols) - $rem;
			$maxelements = options.rows * options.cols * $pages;
			console.warn ('Not a finite multiplier ('+$rem+')');
			/* Want to abort? Do it here! */
		}

		counter = 0;
		$collection.each(function(index, element) {
			//console.log($(this));
            raster[counter] = $(this).prop('outerHTML');;
			counter++;
        });
		
		if ($rem){ //
			for (i=counter; i<$maxelements; i++ ){
				raster[i] = raster[i-counter];
			}
		}
		

		var counter = 0;
		var $addClass = '';

		for (y=options.cols; y>0; y--){
					
			$panel += '<ul class="matrixPager-row">';
			
			for (x=0; x<options.rows; x++){
					
					$addClass = '';
					if (y == options.rows) $addClass=' first';
					if (y == 0) $addClass=' last';
					
					$panel += '<li class="'+x+'x'+y+$addClass+'" style="width:103px; height:51px">';
					$panel += '		<div class="source">';					
					$panel += 			raster[counter];
					$panel += '		</div>';
					$panel += '		<div class="destination">';
					$panel += 			raster[counter+(options.rows*options.cols)];					
					$panel += '		</div>';					
					$panel += '</li>';					
					counter ++;
				}
			
			$panel += '</ul>';
		}
		
		$panel = $($panel);
		$this.html('').append($panel);
		
		if (options.triggerStart != 'timer') {
				
			$this.find('.source').bind(options.triggerStart, function(){ options.bindTriggerStart($(this)) });
			$this.find('.source').bind(options.triggerEnd,   function(){ options.bindTriggerEnd  ($(this)) });
					
		} else {
			
			//console.log('raster-length: '+raster.length + ' / Pages :'+$pages);
			
			setTimeout(function(){
				
				pagerDo($this, options.effect);
			
			}, options.delayStart);

		}
    });

  };
})( jQuery );