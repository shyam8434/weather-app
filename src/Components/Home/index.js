import { useEffect, useState } from "react";
import "./home.css";
import LocationDetail from "../LocationDetail";
import Header from "../Header";

export const Home = ({ location }) => {
  const [weatherDetails, setWeather] = useState(null);

  const fetchWeather = async (cityDetail) => {
    try {
      if (cityDetail) {
        setWeather(null);
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

  return (
    <div className="main">
      <Header location={location} getWeather={fetchWeather} />
      <LocationDetail weatherDetails={weatherDetails} />
    </div>
  );
};
