window.addEventListener('deviceorientation', (event) => {
  alpha = event.alpha; // 0–360 degrees, compass direction
});


function requestOrientationPermission() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          orientationGranted = true;
        } else {
          alert("Permission denied.");
        }
      })
      .catch(console.error);
  } else {
    // Non-iOS devices
    window.addEventListener('deviceorientation', handleOrientation);
    orientationGranted = true;
  }
}

function requestPermission() {
  requestOrientationPermission();
  
  // Request geolocation permission properly
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      updateLocation, 
      (error) => {
        console.error("Geolocation error:", error);
        // Don't remove button if geolocation fails, let user try again
      }, 
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  } else {
    console.error("Geolocation not supported");
  }
  
  if (typeof permissionBtn !== 'undefined' && permissionBtn) {
    permissionBtn.remove();
  }
}

function handleOrientation(event) {
  alpha = event.alpha;
}