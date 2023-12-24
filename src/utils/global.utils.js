import { useEffect, useState } from "react";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const useFetchLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationDetail, setLocationDetail] = useState(null);

  function success(pos) {
    const crd = pos.coords;
    setLocation(crd);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    if (location)
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
      )
        .then((resp) => resp.json())
        .then((result) => setLocationDetail(result));
  }, [location]);

  return { cordinate: location, locationDetail };
};
