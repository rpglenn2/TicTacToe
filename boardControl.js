var turn = 0;
var counter = 0;
var win = 0;
var array = [10,11,12,13,14,15,16,17,18];

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

function equals(num1, num2, num3) {
	if((array[num1] == array[num2]) && (array[num2] == array[num3]) && (array[num1] == array[num3])){
		return true;
	}
    return false;
}

function checkWin() {
	win = 0;
	/*for(var i=0; i < 9; i++) {
		var box = document.getElementById("box" + (i+1));
		if(endsWith(box.src, "x.png")) {
			array[i] = 1;
		}
		if(endsWith(box.src, "o.png")) {
			array[i] = 2;
		}
	}*/
	if(equals(0,1,2))
		win = array[0];
	if(equals(3,4,5))
		win = array[3];
	if(equals(6,7,8))
		win = array[6];
	if(equals(0,3,6))
		win = array[3];
	if(equals(1,4,7))
		win = array[1];
	if(equals(2,5,8))
		win = array[2];
	if(equals(0,4,8))
		win = array[0];
	if(equals(6,4,2))
		win = array[6];		
	
	if(win == 1 || win == 2) {
		alert('Player ' + win + ' wins!');
		//update scoreboard
	}
		
}

function toggleBox(name) {
	var box = document.getElementById(name);
	if(endsWith(box.src, "blank.png")) {
		var substr = name.substring(3);
		//alert('Player ' + substr + ' wins!');
		if(turn == 0) {
			box.src = "x.png";
			turn = 1;
			counter++;
			array[substr - 1] = 1;
		} else { 
			box.src = "o.png";
			turn = 0;
			counter++;
			array[substr - 1] = 2;
		}
		checkWin();
		
		if(counter >= 9 && win == 0) {
			navigator.vibrate(3000);
			alert('Game Over!  It\'s a tie.');
		}
	}
}

function clearGame() {
	turn = 0;
	array = [10,11,12,13,14,15,16,17,18];
	counter = 0;
	win = 0;
	for(var i=1; i < 10; i++) {
		var box = document.getElementById("box" + i);
		box.src = "blank.png";
	}
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

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
}
