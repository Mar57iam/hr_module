


export function getCurrentLocation(callback, errorCallback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          callback({ latitude, longitude });
        },
        (error) => {
          errorCallback(error);
        }
      );
    } else {
      errorCallback(new Error("Geolocation is not supported by this browser."));
    }
  }
  
  