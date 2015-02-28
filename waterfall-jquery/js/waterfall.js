$( window ).load( function(e){
	waterfall();
	var dataInt = { 'data': [{ 'src': '1.jpg' },{ 'src': '2.jpg' },{ 'src': '3.jpg' },{ 'src': '4.jpg' }]};
	$(window).scroll(function(){
		if( checkscrollside() ){
			$.each( dataInt.data, function(index,value){
				var $oPin = $('<div>').addClass('pin').appendTo( $("#main") );
				var $oBox = $('<div>').addClass('box').appendTo( $oPin );
				$('<img>').attr('src','./images/' + $(value).attr('src')).appendTo( $oBox );
			});
			waterfall();
		}
	});
	function waterfall(){
		var $aPin = $( "#main>div" );
		var iPinW = $aPin.eq(0).outerWidth();
		var num = Math.floor( $(window).width() / iPinW );
		$( "#main" ).css({
			'width' : iPinW * num,
			'margin' : '0 auto'
		});

		var pinHArr = [];
		$aPin.each(function( index, value ){
			var pinH = $aPin.eq( index ).height();
			if( index < num ){
				pinHArr[ index ] = pinH;
			}else{
				var minH = Math.min.apply( null, pinHArr );
				var minHIndex = $.inArray( minH, pinHArr );
				$( value ).css({
					'position': 'absolute',
					'top': minH + 15,
					'left': $aPin.eq( minHIndex ).position().left
				});
				pinHArr[ minHIndex ] += $aPin.eq( index ).height() + 15;
			}
		});
	}
	function checkscrollside(){
		var $aPin = $("#main>div");
		var lastPinH = $aPin.last().get(0).offsetTop + Math.floor( $aPin.last().height()/2);
		var scrollTop = $( window ).scrollTop();
		var documentH = $( document ).height();
		return (lastPinH < scrollTop + documentH ) ? true : false;
	}
});