import { useEffect, useState } from "react";
import "./forecast.css";
import { convertToCelcius } from "../../utils/global.utils";

const ForeCast = ({ location }) => {
  const [forecastList, setForecastList] = useState([]);

  const fetchForcast = async (location) => {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location?.lat}&lon=${location?.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
        .then((resp) => resp.json())
        .then((result) => {
          if (result.daily) setForecastList(result.daily);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location && Object.keys(location).length) fetchForcast(location);
  }, [location]);
  return (
    <div className="forecast-main">
      {forecastList.slice(1).map((item) => (
        <div className="forecast-card">
          <span className="description-forecast">{item?.weather[0]?.description}</span>
          <div className="temp-container-forecast">
            <span className="forecast-temp">
              {convertToCelcius(item?.temp?.day)}
            </span>
            <span className="celcius">°C</span>
          </div>
          <span className="description-forecast">{new Date(item.dt * 1000).toDateString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ForeCast;
