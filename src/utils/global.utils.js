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

  return { cordinate: location, locationDetail: {
    ...locationDetail,
    lat: locationDetail?.latitude,
    lon: locationDetail?.longitude,
    name: locationDetail?.city,
    state: locationDetail?.principalSubdivision,
    country: locationDetail?.countryName
  } };
};

export const convertToCelcius = (temp) => {
  return Number((temp || 0) - 273.15).toFixed(2)
}
