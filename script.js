
let latitude = null;
let longitude = null;
let locationError = null;

let now;
let pos;
let alpha = 0;

let poleHeight = 10;
let orientationGranted = false;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);

  // get geolocation and watch changes
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, console.error, {
      enableHighAccuracy: true
    });
  }

  let btn = createButton("Enable Device Orientation");
  btn.position(width/2 - 80, height - 40 );
  btn.mousePressed(requestOrientationPermission);

}

function updateLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}



function draw() {
  background(225);


  if(latitude && longitude){
    console.log(alpha)
    console.log("location retreived")
    now = new Date();
    pos = SunCalc.getPosition(now, latitude, longitude);
    let altitude = pos.altitude * (180 / Math.PI); // convert to degrees
    let azimuth = pos.azimuth * (180 / Math.PI); // convert to degrees and adjust, 

    // calculate shadow length
    let shadowLength = poleHeight / tan(altitude);
    let shadowDirection = (azimuth + 180 - alpha + 360) % 360; //shadow points opposite to the sun

    // drawing
    push();
    translate(width/2, height/2);
    rotate(shadowDirection);

    let radius = 50;
    let baseY_length = 30
    noFill();
    circle(0, 0, radius*2); 
    strokeWeight(1);
    for(let i =0;i<=24;i++){

      let xStart = -radius + i/24*radius*2;
      let yStart = sqrt(radius*radius - xStart*xStart);//radius*sin(180/24*i);
      let xEnd = -radius + i/24*radius*2;

      let coef = i>12 ? 12-(i-12) : i;
      let expcoef = pow(coef,1.5);
      let yEnd = baseY_length+yStart +shadowLength * expcoef/12;

      line(xStart, yStart, xEnd, yEnd);
    }
    pop();
  }else{
    console.log("Waiting for location...");
  }

}