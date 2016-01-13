// Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }
    
	// Called when a photo is successfully retrieved
    //
    function onPhotoFileSuccess(imageURI) {alert('file');
      // Get image handle
      console.log(JSON.stringify(imageData));
      
   	  // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function uploadPhoto(imageURI) { 
      var options = new FileUploadOptions();
	  options.fileKey = "file";
	  options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
	  options.mimeType = "image/jpeg";
	  
	  pictureSource = imageURI.substr(imageURI.lastIndexOf('/')+1);
	  alert("Name:"+pictureSource);
	  alert(imageURI);
	  var params = new Object();
      params.value1 = "test";
      params.value2 = "param";
 		
      options.params = params;
      options.chunkedMode = false;// If it is not set the PHP server won't able to read this image'
	  var ft = new FileTransfer();
	  ft.upload(imageURI,getBaseURL()+"?rquest=uploadImage",win,fail,options);
	  
	  alert('completed uploading');
    }

    function win(r){
		alert('success'); 
		alert("Response = " + r.response);
		alert("Sent = " + r.bytesSent);
		// var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      //largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      //largeImage.src = getSiteURL()+"/rest/uploads/images/"+pictureSource;
		
	}
	function fail(error){
		alert('Failed');
	}
    // A button will call this function
    //
    function capturePhotoWithData() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }

    function capturePhotoWithFile() {
        navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
    }
    
    // A button will call this function
    //
    function getPhoto(source) {alert('getPhoto');
      // Retrieve image file location from specified source
      navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }
