var turn = 0;

var imageName="";

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function checkWin() {
	var win = 0;
	var array = [10,11,12,13,14,15,16,17,18];
	for(var i=0; i < 9; i++) {
		var box = document.getElementById("box" + (i+1));
		if(endsWith(box.src, "x.png")) {
			array[i] = 1;
		}
		if(endsWith(box.src, "o.png")) {
			array[i] = 2;
		}
	}
	if(array[0] == array[1] == array [2])
		win = array[0];
	if(array[3] == array[4] == array [5])
		win = array[3];
	if(array[6] == array[7] == array [8])
		win = array[6];
	if(array[0] == array[3] == array [6])
		win = array[3];
	if(array[1] == array[4] == array [7])
		win = array[1];
	if(array[2] == array[5] == array [8])
		win = array[2];
	if(array[0] == array[4] == array [8])
		win = array[0];
	if(array[6] == array[4] == array [2])
		win = array[6];		
	
	if(win == 1 || win == 2) {
		navigator.vibrate(3000);
		alert('Game Over!');
	}
		
}

function toggleBox(name) {
	var box = document.getElementById(name);
	if(endsWith(box.src, "blank.png")) {
		if(turn == 0) {
			box.src = "x.png";
			turn = 1;
		} else { 
			box.src = "o.png";
			turn = 0;
		}
	}
	checkWin();
}

function clearGame() {
	turn = 0;
	for(var i=1; i < 10; i++) {
		var box = document.getElementById("box" + i);
		box.src = "blank.png";
	}	
	
function changePhoto(name) {
	imageName = name;
	//alert('Changing Photo');
	// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function onPhotoDataSuccess(imageData) {
      // Get image handle
      //
      var smallImage = document.getElementById(imageName);

      // Unhide image elements
      //
      //smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
}

}