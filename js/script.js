
// Canvas updates per second
const FPS = 30;
// How many frames is the animation?
const FRAMES = 720;
// Current frame
frame = 0;

// Initialize variables and create class instances
document.addEventListener("DOMContentLoaded", Initialize);
	
function Initialize(){
	// The canvas
	CANVAS = document.getElementById("canvas");
	// The context
	CTX = canvas.getContext("2d");
	/*
	// Background image
	bgImage = document.getElementById("bg");
	// logo image
	logoImage = document.getElementById("logo");
	// sas logo image
	sasImage = document.getElementById("sas");
	// header 1 image
	hOneImage = document.getElementById("headerOne");
	// header 2 image
	hTwoImage = document.getElementById("headerTwo");
	// cloud image
	cloudImage = document.getElementById("cloud");
	// plane image
	planeImage = document.getElementById("plane");
	*/
	
	
	// Background image
	bgImage = new Image();
	bgImage.src = "./img/bg.jpg";
	// logo image
	logoImage = new Image();
	logoImage.src = "./img/logo-star-alliance.png";
	// sas logo image
	sasImage = new Image();
	sasImage.src = "./img/logo-sas.png";
	// header 1 image
	hOneImage = new Image();
	hOneImage.src = "./img/header-one.png";
	// header 2 image
	hTwoImage = new Image();
	hTwoImage.src = "./img/header-two.png";
	// cloud image
	cloudImage = new Image();
	cloudImage.src = "./img/cloud.png";
	// plane image
	planeImage = new Image();
	planeImage.onload = function() {
		// Update scale and size of canvas
		UpdateDisplay();
		// Start update loop
		Update();
	}
	planeImage.src = "./img/plane.png";
	
	
	
}

// Update function to exectute at every frame
function Update(){
	// Update frame count
	frame = frame > FRAMES ? 0 : frame+1;
	
	// Clear canvas
	CTX.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw the background
	var bgDim = GetDimensions(bgImage);
	CTX.drawImage(	bgImage, 
					(Math.max(bgDim.width-Math.min((bgDim.height*CANVAS.width)/(CANVAS.height),bgDim.width),0))/2, 		// Always draw center of image in X-axis
					0, 																									// Should always be 0 since entire height will be shown
					Math.min((bgDim.height*CANVAS.width)/(CANVAS.height),bgDim.width), 									// Width should be fit to window, but keep same scale as height
					bgDim.height,																						// Entire height will always be shown
					0, 																									// Drawing should always start in the upper left corner
					0, 																									// Drawing should always start in the upper left corner
					CANVAS.width , 																						// Always fill canvas
					CANVAS.height );																					// Always fill canvas
					
	// Draw Plane
	var planeDim = GetDimensions(planeImage);
	CTX.drawImage(planeImage, 0, 0, planeDim.width, planeDim.height, Lerp(CANVAS.width+planeDim.width,-planeDim.width,frame/(FRAMES*0.3)), Lerp(CANVAS.height*0.2, CANVAS.height*0.05,frame/(FRAMES*0.3)), planeDim.width, planeDim.height);
	
	// Draw Cloud
	var cloudDim = GetDimensions(cloudImage);
	CTX.drawImage(cloudImage, 0, 0, cloudDim.width, cloudDim.height, Lerp(-cloudDim.width*1.5,CANVAS.width,frame/FRAMES), CANVAS.height-cloudDim.height*1.5, cloudDim.width*1.5, cloudDim.height*1.5);
	
	// Draw second cloud
	CTX.drawImage(cloudImage, 0, 0, cloudDim.width, cloudDim.height, Lerp(-cloudDim.width*5,CANVAS.width,frame/FRAMES), CANVAS.height-cloudDim.height, cloudDim.width*3, cloudDim.height);
	
	// Draw Logo
	var logoDim = GetDimensions(logoImage);
	CTX.drawImage(logoImage, 0,0,logoDim.width,logoDim.height,CANVAS.width-logoDim.width,0,logoDim.width, logoDim.height);
	
	// Draw SAS logo
	var sasDim = GetDimensions(sasImage);
	CTX.drawImage(sasImage,0,0,sasDim.width,sasDim.height, (CANVAS.width/2)-(sasDim.width/4), CANVAS.height-sasDim.height/2-20, sasDim.width/2, sasDim.height/2);
	
	// Draw header 1
	var h1Dim = GetDimensions(hOneImage);
	var fadeTime = 30;																																// Time in frames that the first header should fade into the second one
	var interval = 20;																																// Time between the two headers
	var displayTime = (FRAMES-(2*interval)-(4*fadeTime))/2;																							// Time for each header to be shown at full opacity
	CTX.globalAlpha = 	frame < displayTime + fadeTime + interval ? 																				// Set Alpha Value
						1-Math.min(1,((Math.max(0,frame-displayTime)%displayTime)/fadeTime)):														// Fade out
						Math.min(1,((Math.max(0,frame-(displayTime*2+interval*2+fadeTime*3))%(displayTime*2+interval*2+fadeTime*3))/fadeTime));		// Fade in
	var h1Width = CANVAS.height < h1Dim.height*3 ? h1Dim.width/2 : Math.min(CANVAS.width-50,h1Dim.width);											// Width of image
	CTX.drawImage(	hOneImage,
					0, 0, h1Dim.width, h1Dim.height,
					(CANVAS.width/2)-h1Width/2,
					(CANVAS.height/2)-h1Dim.height/2,
					h1Width,
					(h1Dim.height/h1Dim.width)*h1Width);
	CTX.globalAlpha = 1;		

	// Draw header 2
	var h2Dim = GetDimensions(hTwoImage);
	CTX.globalAlpha = 	frame < displayTime*2 + fadeTime*2 + interval ? 																			// Set Alpha Value
						Math.min(1,((Math.max(0,frame-(displayTime+fadeTime+interval))%(displayTime+fadeTime+interval))/fadeTime)):					// Fade in
						1-Math.min(1,((Math.max(0,frame-(displayTime*2+interval+fadeTime*2))%(displayTime*2+interval+fadeTime*2))/fadeTime));		// Fade out
	h1Width = CANVAS.height < h2Dim.height*3 ? h2Dim.width/2 : Math.min(CANVAS.width-50,h2Dim.width);
	CTX.drawImage(	hTwoImage,
					0, 0, h2Dim.width, h2Dim.height,
					(CANVAS.width/2)-h1Width/2,
					(CANVAS.height/2)-h2Dim.height/2,
					h1Width,
					(h2Dim.height/h2Dim.width)*h1Width);
	CTX.globalAlpha = 1;	
	
	// Set next execution of Update()
	setTimeout(Update, 1000/FPS)
}

// Get dimensions of image. Could use naturalHeight and other solutions, but they are not supported by all browsers.
function GetDimensions(img){
	var imgFile = new Image();
	imgFile.src = img.src;
	return {
		width: imgFile.width, 
        height: imgFile.height
	};
}

// Lerp function. Not included in Math library?
function Lerp (val1, val2, amount){
	amount = Math.min((Math.max (0, amount)),1);
	return val1 + (val2-val1) * amount;
}

// Event when the screen size is changed
window.addEventListener('resize', function (event){
	// Run function every time the window is resized -> Adapt style to current size
	UpdateDisplay();
})

// Resize canvas to fit display, but keep ratio of background image
function UpdateDisplay(){
	var bgDim = GetDimensions(bgImage);
	CANVAS.height = window.innerHeight-5;															// Always use full height of window
	CANVAS.width = 	Math.min(window.innerWidth,(CANVAS.height/bgDim.height)*bgDim.width);	// Use window width if smaller than scaled width
}