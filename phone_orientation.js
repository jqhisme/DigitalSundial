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
  navigator.geolocation.getCurrentPosition(updateLocation, console.error, {
    enableHighAccuracy: true
  });
  if (typeof permissionBtn !== 'undefined' && permissionBtn) {
    permissionBtn.remove();
  }
}

function handleOrientation(event) {
  alpha = event.alpha;
}