var DB_NAME = 'bd';
var DB_VERSION = 1;
var DB_STORE_NAME = 'files';
var db;
var listFiles;

var tempArray = [];

// firefox image
const fx = new Array('transparent','rgb(0, 0, 0)','rgb(0, 0, 0)','transparent','transparent','transparent','transparent','transparent','rgb(0, 0, 0)','transparent','transparent','transparent','transparent','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(0, 0, 0)','transparent','rgb(0, 0, 0)','transparent','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(0, 0, 0)','transparent','transparent','transparent','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(255, 153, 41)','rgb(0, 0, 0)','rgb(255, 153, 41)','rgb(255, 121, 32)','rgb(0, 0, 0)','transparent','transparent','rgb(0, 0, 0)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(0, 0, 0)','transparent','transparent','transparent','rgb(252, 109, 15)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 121, 32)','rgb(0, 0, 0)','transparent','transparent','transparent','rgb(255, 121, 32)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 121, 32)','rgb(0, 0, 0)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(0, 0, 0)','rgb(0, 0, 0)','transparent','transparent','transparent','rgb(255, 121, 32)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 121, 32)','rgb(252, 109, 15)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 121, 32)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(255, 121, 32)','rgb(255, 121, 32)','rgb(0, 0, 0)','transparent','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','transparent','transparent','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','transparent','transparent','transparent','transparent','rgb(252,109, 15)','rgb(252, 109, 15)','rgb(252, 109, 15)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','transparent','transparent','transparent','transparent','transparent','transparent','rgb(252, 109, 15)','rgb(252, 109, 15)','rgb(255, 121, 32)','rgb(255, 121, 32)','rgb(255, 121, 32)','rgb(0, 0, 0)','transparent','transparent','transparent','transparent','transparent','transparent','rgb(252, 109, 15)','rgb(252, 109, 15)','rgb(255, 121, 32)','rgb(255, 121, 32)','rgb(255, 153, 41)','rgb(255, 153, 41)','rgb(0, 0, 0)','transparent','transparent','transparent','transparent','transparent');


	/**
	*Get reference of ObjectStore
	*
	*	@param {string} store_name 
	*	@param {string} mode 
	*	@return { objectStore } - ObjectStore of files 
	*/
	function getObjectStore(store_name, mode) {
		var tx = db.transaction(store_name, mode);
		return tx.objectStore(store_name);
	};
  
	/**
	*   Open database
	*	@param {function} callback
	*/  
	function openDb(callback) {

		var req = indexedDB.open(DB_NAME, DB_VERSION);

		req.onsuccess = function (evt) {
		  db = this.result;
		  callback();
		}
		
		req.onerror = function (evt) {
		};
		
		// creates index and put firepixel logo
		req.onupgradeneeded = function (evt) {
			 var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
			  
			  store.createIndex('name', 'name', { unique: true });
			  store.createIndex('array', 'array', { unique: false});
			  
			  var dataFile = [
			  {name: "pixelfire", array: fx}
			  ];
			  
			  store.add(dataFile[0]); 
		};
	 
	 };
 
	/**
	* Get all elements in database
	* @return {Array} All elements
	*/
	 function getAllElements(){
		
		listFiles = new Array();
		var nome =[];
		var array =[];

		var objectStore = getObjectStore(DB_STORE_NAME, 'readwrite');
		
		var oc = objectStore.openCursor();
		
		oc.onsuccess = function(event) {
			
			var cursor = event.target.result;
			if (cursor) {
				nome.push(cursor.value.name);
				array.push(cursor.value.array);
				cursor.continue();
			}else {
				listFiles.push(nome);
				listFiles.push(array);
				printListFile(listFiles);	
			}

		};
		
		oc.onerror = function(){
			alert('erro');
		};
		
		return listFiles;
	};

  
	 /**
	 * Adds array of colors in database whit specific name
	 * @param {String} name
	 * @param {Array} array
	 */ 
	 function addFile(name, array) {
		  
		var obj = { name: name, array: array};
		
		if (typeof blob != 'undefined')
		  obj.blob = blob;

		var store = getObjectStore(DB_STORE_NAME, 'readwrite');
		
		var req;

		try {
		  req = store.add(obj);
		} catch (e) {
		  if (e.name == 'DataCloneError')
		   console.log('error');
		  throw e;
		}
		req.onsuccess = function (evt) {
			$('#ct_save').css('display', 'none');
			$('#ct_msg').css('display', 'block');
			$('#msg_sus').css('display', 'block');
			$('#msg_err').css('display', 'none');

				
		};
	};
  
  /**
  * @param {String} file
  */
  function deleteFile(file){

	var store = getObjectStore(DB_STORE_NAME, 'readwrite');
	
	var req = store.index("name").get(file);
    
	req.onsuccess = function(evt) {
		var record = evt.target.result;
		console.log("record:", record);
		if (typeof record == 'undefined') {
			console.log('error get'); 
			return;
		}
	  
		var request = store.delete(evt.target.result.id);
		
		request.onsuccess = function(event) {
			getAllElements();
		};

	}
  
  };