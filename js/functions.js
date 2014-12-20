   /**
   * Initializes the process of saving
   */
	function saveFile(){
		getCanvas( 420, 360, 'canvas', printCanvas);
	}
	
	/** 
	*  Convert data to blob
	*  @param {dataURL} data
	*  @return {Blob}
	*/
	function dataToBlob(data) {
	  var binary = atob(data.split(',')[1]), array = [];
	  var type = data.split(',')[0].split(':')[1].split(';')[0];
	  for(var i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
	  return new Blob([new Uint8Array(array)], {type: type});
	}
	
	/**
	* Creates a canvas and call printCanvas with parameter canvas created
	* @param {int} h - height canvas
	* @param {int} w - width canvas
	* @param {String} id - id canvas
	* @param {function} callback
	*/
	function getCanvas(h, w, id,  callback){
		
		var canvas = null;
		var ctx = null;
		
		var canv = document.createElement('canvas'); 
		//setting canvas
		canv.id = id; 
		canv.height = h; 
		canv.width = w; 
		document.body.appendChild(canv);	
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		
		callback(ctx, previewSave);
	
	}
	
	
	/**
	* Converts the drawing created user (divs) to canvas
	* @param {context2d} ctx 
	* @param {function} callback
	*/
	function printCanvas(ctx, callback){

		var size = 30;
		var posInit = 0;
		var arry = [];
		var j=0;
        
		ctx.clearRect(0,0,360, 420);	
		
		for (var ln=0; ln<14; ln++){
			posInit = 0;
			for(var i=0; i<12; i++){
				ctx.fillStyle = matrizImage[j++];
				ctx.fillRect(posInit, ln*30, size,size);
				posInit+=size;
			}
		}
	  callback(ctx);
	};
	
	/* 
	* Preview of image and show of options of rescue (1- save and 2- save as png)
	*/
	function previewSave(){
		
		var canvas = document.getElementById("canvas");
		var dataurl = canvas.toDataURL('image/png');
		var newImg = document.getElementById("image");
		newImg.src = dataurl;
		
		$('#down').css('display','block');
		
		$('#down').click( function(){
				saveAsPNG();
		});	
		
		$('#save').click( function(){
				save();
		});
		
		$('#ct_save').css('display', 'block'); 
	};
	
	
	/**
	*	Saves the file as PNG in the device. 
	*/
	function saveAsPNG() {
		var name = getNameFile();
		
		var canvas = document.getElementById("canvas");
		var c = canvas.getContext('2d');

		var dataurl = canvas.toDataURL('image/png');
		var newImg = document.getElementById("image");
		var file = dataToBlob(canvas.toDataURL('image/png'));

		newImg.src = dataurl;
		
		$('#image').css('height','280px');
		$('#image').css('height','240px');
		
		var storage = navigator.getDeviceStorage('pictures');
	
		var request =storage.addNamed(file,'PixelFire/'+name+'.png');
							
		request.onsuccess = function () {
			$('#ct_save').css('display', 'none');
			$('#ct_msg').css('display', 'block');
			$('#msg_sus').css('display', 'block');
			$('#msg_err').css('display', 'none');
		};
		
	  $('#canvas').remove();
	};
	
	/*
	*	Saves the file in the database. 
	*/
	function save(){
		addFile(getNameFile(), matrizImage); 
	 };
	
	/**
	*  clear editor screen
	*/
	function clearDivsPixel(){
		$('.pixel').css('background-image', "url('img/transp.png')");
		$('.pixel').css('background-color', "transparent");
	};
	
	
	
	/**
	*  make a image with divs in editor screen
	 * @param {Array} file
	*/
	function printSavedFile(file){
	    var i=0;
		$('.pixel').each(function(){ 
				if(file[i] == 'transparent'){
					$(this).css('background-color', 'transparent');
					$(this).css('background-image', "url('img/transp.png')");
				}else{
					$(this).css('background-image','none');
					$(this).css('background-color', file[i]);
				}	
					i++;
			});
	
	};
	
	
	/**
	* Show complete list obtained of database as image in list image
	* @param {Array} list
	*/
	function printListFile(list){
		var str ="<div class='title_list_file'>List File <img id='bt_menu2' src='img/menu.png'></div>";
		
		for(var i = 0; i<list[0].length; i++){
			
				var canvas = null;
				var ctx = null;
				var size = 30;
				var posInit = 0;
				var arry = [];
				var j=0;
				
				//create a cavas
				var canv = document.createElement('canvas'); 
				canv.id = 'canvas2'; 
				canv.height = 105; 
				canv.width = 90; 
				document.body.appendChild(canv);	

				canvas = document.getElementById('canvas2');
				ctx = canvas.getContext('2d');
	
				ctx.clearRect(0,0,105,90);	

				for (var ln=0; ln<14; ln++){
					posInit = 0;
					for(var l=0; l<12; l++){
						ctx.fillStyle = list[1][i][j++];
						ctx.fillRect(posInit, ln*7, 7,7);
						posInit+=7;
					}
				}
				
				var dataurl = canvas.toDataURL('image/png');

				str+="<div id='file"+i+"' class='files floating' num='"+i+"' >";
					
					str+="<div style='float:left; background:rgba(255,255,255, .2); '> <img id='imfile"+i+"'  src='"+dataurl+"' height='87' width='70' style='margin-top:5px; margin-left:5px'></div>";
				
					str+="<div class='link_files' name="+list[0][i]+"  num='"+i+"'  style='float:left; margin-left:10px; margin-top:0px; font-size:30px; text-align:center; height:100px; width:145px'>";
				
						str+="<div style='margin-top:30px; text-decoration:underline; overflow: hidden;'>"+list[0][i]+"</div>";
	
					str+="</div>";
				if(i !==0)
				str+="<div style='float:right; width:30px;' class='delete_file' ex='"+list[0][i]+"'><img   class='img_garbage' src='img/garbage.png' height='30' width='30' ></div>";
				
				str+="</div>";
				
				$('#canvas2').remove();
		}		
		
		$('#list_files').html(str);
		
		//buttom menu in list file
		$('#bt_menu2').click(function(){
			$('#ct_menu').css('display','block');
			$('#list_files').css('display','none');
		});
		
				
		$('.link_files').click(function(){
			var indice = parseInt($(this).attr('num'));
			namefile = $(this).attr('name');
			printSavedFile(list[1][indice]);
			$('#ct_editor2').css('display','block');
			$('#list_files').css('display','none');
		});
		
		$('.delete_file').click(function(){
			deleteFile($(this).attr('ex'));
		});
	
	}
	
	/**
	* Get and convert to String the date/time current
	* @return {String} namefile - name of file
	*/
	function getNameFile(){
	  
	   var namefile;
	   var date = new Date();
	   
	   var day = date.getDay();
	   var temp_month = date.getMonth();
	   var month = parseInt(temp_month) + 1;
	   var year = date.getFullYear();
	   var hours =  date.getHours();
	   var minutes = date.getMinutes();
	   var seconds = date.getSeconds();
	   
	   namefile = year+"-"+month+"-"+day+"-"+hours+"-"+minutes+"-"+seconds;
	  
	   return namefile;

	}