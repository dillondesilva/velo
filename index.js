// Standard google logo image and it's size
const imgURL = "https://homepages.cae.wisc.edu/~ece533/images/watch.png";
const imgSize = 697056;

function displayResults(speedMbps) {
    $("#result").text(`${speedMbps} Mbps DL`);
    $("#loading, #testno").fadeOut("fast", function () {
      $("#testno").text('0/5');
      $("#result, #reset").fadeIn("fast", function () {
        console.log('second animation finished');
      });
    });
}

function calcSpeed(startTime, endTime) {
  var elapsedTime = (endTime - startTime) / 1000;
  var bitsLoaded = imgSize * 8;
  var speedBps = (bitsLoaded / elapsedTime).toFixed(2);
  var speedKbps = (speedBps / 1024).toFixed(2);
  var speedMbps = (speedKbps / 1024).toFixed(2);  

  return speedMbps
}

// Initialise speed test download runs
function initSpeedTest() {
  $("#start").fadeOut("fast", function () {
    $("#loading, #testno").fadeIn("fast", function () {
      console.log('first animation finished');
    });
  });
  console.log('Speed test running...');

  // Executing warm up...
  console.log('Executing warm up...')
  executeTestIterations(0, 2, 0, (speedTotal) => {
    var averageDLSpeed = speedTotal / 5;
    console.log(`Warm up speed was ${averageDLSpeed}`);
  })

  // Now commencing formal speed test...
  executeTestIterations(0, 5, 0, (speedTotal) => {
    var averageDLSpeed = Math.round((speedTotal / 5) * 100) / 100;
    displayResults(averageDLSpeed);  
  })
}

// Recursive function which will keep track of the speed
// total to average later
function executeTestIterations(currentIter, numOfIter, speedTotal, callback) {
  runSpeedTest((speed) => {
    if (currentIter < numOfIter) {
      $("#testno").text(`${currentIter + 1}/5`);
      executeTestIterations(currentIter + 1, numOfIter, speedTotal + speed, callback);
    } else {
      callback(speedTotal + speed);
    }
  });
}

// Runs a single speed test and returns back the internet
// speed to be used in a callback func
function runSpeedTest(callback) {
  // Init variables for timestamps
  var startTime, endTime;

  var downloadImage = new Image();

  // Once downloadImage has a loaded source,
  // the speed will be calculated
  downloadImage.onload = () => {
    endTime = (new Date()).getTime();
    var result = parseFloat(calcSpeed(startTime, endTime));
    callback(result);
  }

  // Oops
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

// rests speed test
function resetSpeedTest() {
  $("#result, #reset").fadeOut("fast", function () {
    $("#start").fadeIn("fast", function () {
      console.log('reset animation part 2 finished');
    });
  });
}
