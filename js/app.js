'use strict';

    /** Initialize application 
	*/
    function init() {
			colorSelected='#fff';
			matrizImage = new Array();
			tool = PENCEL;
			rbg_target =0;
			fileName ='';
			canvas = null;
			setEvents();
   }
	
	
	/**
	Set all events of buttons
	*/
   function setEvents(){
      
		//bt new file (main screen)
		$('#bt_newfile').click(function(){
			namefile = 'image';
			$('#ct_menu').css('display','none');
			$('#ct_editor2').css('display','block');
			clearDivsPixel();
	
		});
	 
	     //bt open file (main screen)
		$('#bt_openfile').click(function(){
			
			$('#ct_menu').css('display','none');
			 $('#list_files').css('display','block');
			openDb(function(){
				   getAllElements();
			});
		});
	
		//Select pincel
		$('#pencel').click(function(){
			tool = PENCEL;
			$('#sing_pencel').css('background', 'rgba(0, 255,0, 0.5)');
			$('#sing_eraser').css('background', 'none');
		});

		//Select eraser
		$('#eraser').click(function(){
			tool = ERASER;
			$('#sing_eraser').css('background', 'rgba(0, 255,0, 0.5)');
			$('#sing_pencel').css('background', 'none');
		});

		//Select pallet of colors
		$('#color').click(function(){
			$('#block_display').css('display', 'block');
			$('#palheta').css('display', 'block');
			
			//button close screen
			$('#close').css('display', 'none');
		});
		
		$('#bt_ok_selectcolor').click(function(){
				$('#block_display').css('display', 'none');
				$('#palheta').css('display', 'none');
		});
			
		//Pint or Erase
		$('.pixel').click(function(){
			if(tool == PENCEL){
				$(this).css('background-color',colorSelected);
				$(this).css('background-image','none');
			}else if(tool == ERASER){
				$(this).css('background-image', "url('img/transp.png')");
				$(this).css('background-color', "transparent");
			}
		});


		//buttom menu in editor screen
		$('#bt_menu').click(function(){
			$('#ct_menu').css('display','block');
			$('#ct_editor2').css('display','none');
		});
	
	
		
		//Button New
		$('#bt_new').click(function(){
			clearDivsPixel();			
		});
		
		//button save
		$('#bt_save').click(function(){
			$('#block_display').css('display', 'block');
			$('#filename').val(namefile);
			$('#close').css('display', 'block');
			//set action of button close
			$('#close').click(function(){
				$('#block_display').css('display', 'none');
				$('#ct_save').css('display', 'none');
				$('#ct_msg').css('display', 'none');
				$('#msg_sus').css('display', 'none');d
				$('#msg_err').css('display', 'none');
			});
	
			
			//creating a new reference of array
			matrizImage = new Array();
			//Putting in the array all color of canvas of drawing
			$('.pixel').each(function(i){ 
				matrizImage.push($(this).css('background-color'));
			});
			
			//call saveFile()
			saveFile();
		});
		
		$('#picker').colpick({
			flat:true,
			layout:'hex',
			submit:0,
			
			onChange:function(hsb,hex,rgb,el,bySetColor) {
			   colorSelected = '#'+hex;
			  $('#colorselected').css('background-color',colorSelected);	
			}
		});

	};