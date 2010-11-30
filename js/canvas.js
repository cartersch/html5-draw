$(function(){

	$('#black').addClass('selected');  //setting initial color
	$('.color_notice').css({'background-color': 'black', 'color':'white'});
	
	$('.color_choices div').each(function(){
		$(this).click(function(){
			var color = $(this).attr('id');
			console.log ('clicked: '+color);
			$('.color_choices div').removeClass('selected');
			$(this).addClass('selected');
			
			if (color =='white' || color =='yellow'){
				font_color = 'black';
			} else {
				font_color = 'white';
			}
			
			$('.color_notice').css({'background-color':  color, 'color': font_color})
			setColor(color);
		});
	});
	
	$('.brush_choices li').each(function(){
		$(this).click(function(){
			var brush = $(this).attr('id');
			var text = $(this).html();
			var link = '<a href="#colors" class="slideup">'+text+'</a>';
			$('.brush_choices li').removeClass('brush_selected');
			$(this).addClass('brush_selected');
			brushwidth = brush;
			$('.color_notice').empty();
			$('.color_notice').html(link);
		});
	});
	
	
	
	$('#clear_page').click(function(){
		clearCanvas();
	});
});


var img = new Image(255,255) ;


var newCanvas = document.getElementById("the_canvas") ;
var c = newCanvas.getContext("2d") ;
//var newimg = c.drawImage(img, 0, 0);
var drawMode = false ;
var startX = 0;
var startY = 0;
var strokeColor = 'black';
var brushwidth =1;

newCanvas.addEventListener('touchmove', mousemoveev, false ) ;
newCanvas.addEventListener('touchstart', mousedownev, false ) ;
newCanvas.addEventListener('touchend', mouseupev, false ) ;
newCanvas.addEventListener('onmouseout', mousemoveev, false ) ;

var c = newCanvas.getContext("2d") ;



function mousemoveev(e){ 


        if (e.targetTouches.length > 1) return ;

        if(drawMode == true)
        {
            e.preventDefault() ;
            var x = e.targetTouches[0].pageX-10;
            var y = e.targetTouches[0].pageY-10;
             
             	c.beginPath();
        		c.moveTo(startX, startY);
        		c.lineTo(x, y);
        		c.closePath();
        		c.strokeStyle = strokeColor;
        		c.lineWidth = brushwidth;
             	c.stroke();
            
        		 
        		startX = x; //resetting start x coordinate
             	startY = y; //resetting start y coordinate
             

             return ;
             
             
        }
    }

function mouseoutev(e){    

    e.preventDefault() ;    
    c.drawImage(img, 0, 0);

}

function mouseupev(e){ 
     drawMode = false ;
}

function mousedownev(e){ 
    drawMode = true ;
    
     if (e.targetTouches.length > 1) return ; //checks if coordinates are available
     	startX = e.targetTouches[0].pageX-10; //set initial start x coordinate
      	startY = e.targetTouches[0].pageY-10; //set initial start y coordinate  
     
}


function setColor(color){
	strokeColor = color;
}

function setEraser(){
	strokeColor = 'white';
}

function clearCanvas(){
	c.clearRect(0, 0, 318, 372);
}