// Standard google logo image and it's size
const imgURL = "https://i.dailymail.co.uk/i/pix/2015/09/01/18/2BE1E88B00000578-3218613-image-m-5_1441127035222.jpg";
const imgSize = 19091;

function displayResults(startTime, endTime) {
    var elapsedTime = (endTime - startTime) / 1000;
    var bitsLoaded = imgSize * 8;
    var speedBps = (bitsLoaded / elapsedTime).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);
    
    console.log(speedBps, speedKbps, speedMbps);
    // Insert code for showing speed visibility 
    // within html
}

// Run speed test by downloading image
function runSpeedTest() {
  console.log('Speed test running...');

  // Init variables for timestamps
  var startTime, endTime;

  var downloadImage = new Image();

  // Once downloadImage has a loaded source,
  // the speed will be calculated
  downloadImage.onload = () => {
    endTime = (new Date()).getTime();
    displayResults(startTime, endTime);
  }

  // Fuck...
  downloadImage.onerror = ((err, msg) => {
    alert("Error checking download speed.");
    console.log(err, msg);
  })

  // Beginning image download. Cache Buster makes
  // up for a small loss of time between lines
  // 48 and 49
  startTime = (new Date()).getTime();
  var cacheBuster = "?nnn=" + startTime;
  downloadImage.src = imgURL + cacheBuster;
}