import { useEffect, useState } from "react";
import "./home.css";
import LocationDetail from "../LocationDetail";
import Header from "../Header";
import ForeCast from "../Forecast";

export const Home = ({ location }) => {
  const [weatherDetails, setWeather] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);

  const fetchWeather = async (cityDetail) => {
    try {
      if (cityDetail) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            cityDetail?.latitude || cityDetail.lat
          }&lon=${cityDetail?.longitude || cityDetail.lon}&appid=${
            process.env.REACT_APP_WEATHER_KEY
          }`
        )
          .then((resp) => resp.json())
          .then((result) => {
            setWeather(result);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location?.cordinate) {
      fetchWeather(location.cordinate);
    }
  }, [location]);

  useEffect(() => {
    if (
      location?.locationDetail &&
      Object.keys(location?.locationDetail).length
    )
      setLocationDetails(location.locationDetail);
  }, [location]);

  const changeLocation = (locationData) => {
    setLocationDetails(locationData);
    fetchWeather(locationData);
  };

  return (
    <div className="main">
      <Header location={locationDetails} onChange={changeLocation} />
      <LocationDetail weatherDetails={weatherDetails} />
      <ForeCast location={locationDetails} />
    </div>
  );
};
