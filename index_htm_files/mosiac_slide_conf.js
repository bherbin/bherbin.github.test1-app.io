var xaraSwidgets_mosaic_slideTemplates = {


entry:			'<div class="mosaic-overlay {com_id}_mosaic-overlay"><img src="{image}"/></div>'
		+		'<a href="{link}" class="{com_id}_overlay mosaic-backdrop">'
		+		'<div class="details">'
	//	+		'<h4>{heading}</h4><p>{text}</p></div></a>' 
		+		'<img class="{com_id}_heading" src="{heading}"   border="none"  />'
		+		'<img class="{com_id}_desc" src="{text}" border="none"  />'
		+		'</div></a>',
		

/*myTheme:			'{theme}',
timeout:			'{pause}',
speed:				'{speed}',
panelTrans: 		'{trans}',
*/
		
		
		main:	'<div id="{component_id}OuterDiv" class="mosaic-block cover" >'
			+ 	'{entryhtml}'
			+	'</div>'
};

	
function xsw_cs_htmlbr(str) {
	if (str == undefined)
		return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}

function xaraSwidgets_mosaic_slideGetConfig(value, d)
{
	var ret = parseInt(value);
	
	if(!isNaN(ret))
	{
		return ret;
	}
	else
	{
		return d;
	}
}



// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_mosaic_slideConstructor(divID, data)
{
	var entryHTML = '';
//	var entryHTML2 = '';


	myTheme = (data[0].theme);
	speed = (data[0].speed);
	
	
	
	// loop through each entry in the array and compile the entry template for it
	for(var i=1; i<data.length; i++)
	{
	
	entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_mosaic_slideTemplates.entry, data[i]);
	}
	


	var com1_id=divID;
//	entryHTML = xsw_ea_htmlbr(entryHTML);
	// now lets compile the 'main' template which acts as a wrapper for each entry

	
		// get the speed value 
		var enteredSpeed = parseFloat(speed)*1000;
		var defaultSpeed = '700';
		var speed = isNaN(enteredSpeed) ? defaultSpeed : enteredSpeed

		var useDirection = (data[0].direction);
		var defaultDirection = 1;
		var direction = isNaN(useDirection) ? defaultDirection : useDirection
	
		var effects = [
		
    	'top',
    	'bottom',
    	'left',
    	'right',
    	'topLeft',
    	'topRight',
    	'bottomLeft',
    	'bottomRight'


		];

	var effectName = effects[direction];
		
	

	var mainData = {
		component_id:divID,
		entryhtml:entryHTML,
		com_id:com1_id
	};
	
	


	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_mosaic_slideTemplates.main, mainData);
	
	
			// find the theme value to determine whether theme colors should be matched.
		
		var defaultTheme = 0;
		var enteredTheme = parseInt(myTheme);
		var theme = isNaN(enteredTheme) ? defaultTheme : enteredTheme
//		var theme = parseInt(myTheme);
		if(!isNaN(theme))
			{
			useTheme = theme;
			}	
		if (theme ==1){
			var $p = $("<p class='xr_c_Theme_Color_1'></p>").hide().appendTo("body");
			
			}
		else if (theme ==0){
			var $p = $("<p class=''></p>").hide().appendTo("body");
			
			}

	
		var enteredovercolor = $p.css("color");
	//	console.log(enteredovercolor);
		var defaultovercolor = '#000000';
	//	var overcolor = isNaN(enteredovercolor) ? defaultovercolor : enteredovercolor
		
		if (enteredovercolor !== 'rgb(0, 0, 0)' )
		{
		var overcolor= enteredovercolor
		}
		else 
		{
		var overcolor= defaultovercolor;
		}
//		console.log(overcolor);
		if (document.all && !document.addEventListener)
		//if($.browser.msie && document.documentMode && document.documentMode <= 8) 
		{
//		if (navigator.userAgent.match(/MSIE\s(?!9.0)/)) {
    		// ie less than version 9
    		if (enteredovercolor !== '#000000' )
			{
			var overcolor= enteredovercolor
			}
			else 
			{
			var overcolor= defaultovercolor;
			}

		}
			
    $p.remove();
	
	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	
	$('#' + divID).html(mainTemplate);
	
	
	// get the dimensions of the parent div  
	
	var width = $('#' + divID).parent('div').width();
	var height = $('#' + divID).parent('div').height();
	$('#' + divID + 'OuterDiv').css('width',width);
	$('#' + divID + 'OuterDiv').css('height',height);
	$('#' + divID + 'OuterDiv').css('background','none');
	$('#' + divID + 'OuterDiv').css('z-index','0');
	$('.' + divID + '_mosaic-overlay').css('z-index','2');
	// lets see which direction to hover.
	hoverdirection = effectName ==='top' || effectName ==='bottom' ? 'hover_y' :'hover_x'
	
	
	if (effectName ==='bottom')
		{
			var slideDim = "-"+height+'px';
		}

	if (effectName ==='top')
		{
			var slideDim = height+'px';
		}

	if (effectName ==='left')
		{
			var slideDim = "-"+width+'px';
		}

	if (effectName ==='right')
		{
			var slideDim = width+'px';
		}	
	
	if (effectName ==='topLeft')
		{
			var slideDimX = "-"+width+'px';
			var slideDimY = height+'px';
		}

	if (effectName ==='topRight')
		{
			var slideDimX = width+'px';
			var slideDimY = height+'px';
		}

	if (effectName ==='bottomLeft')
		{
			var slideDimX = "-"+width+'px';
			var slideDimY = "-"+height+'px';
			
		}

	if (effectName ==='bottomRight')
		{
			var slideDimX = width+'px';
			var slideDimY = "-"+height+'px';
		}		

//	console.log(effectName)	
//	console.log(hoverdirection)	
//	console.log(slideDim)	
// write the css values to the doc
					
 $('head').append("<style>."+divID+"_overlay {background:"+overcolor+"; z-index:1;  }"
	 +   "."+divID+"_heading{border:none; display: block; margin-left: 15px;  margin-top: 15px;}"
	 +   "."+divID+"_desc{border:none; display: block; margin-left: 15px;  margin-top: 15px;}"
     +   "</style>" );

		
		if 	(effectName ==='bottom' || effectName ==='top' || effectName ==='left' || effectName ==='right' )	
		{	
	// invoke the effect 
		var opts = {
				animation	:	'slide',	//fade or slide
	//			hoverdirection		:	slideDim	,	//Horizontal position on hover
				speed: speed 
				};
		opts[hoverdirection] = slideDim;
		$('#' + divID + 'OuterDiv').mosaic(opts);

		}

		if 	(effectName ==='bottomRight' || effectName ==='topRight' || effectName ==='bottomLeft' || effectName ==='topLeft' )	

		{

			$('#' + divID + 'OuterDiv').mosaic({
					animation	:	'slide',
					hover_x	:	slideDimX,		//Vertical anchor position
					hover_y	:	slideDimY,		//Vertical anchor position
					speed 		: 	speed
				
				});
		}
					

					
}
