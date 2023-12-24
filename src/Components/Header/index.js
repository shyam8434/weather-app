import { useEffect, useMemo, useState } from "react";
import frame from "../../Assets/Frame.svg";
import search from "../../Assets/Search.svg";
import "./header.css";

const Header = ({ location, getWeather }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchTxt);
    }, [500]);
    return () => clearTimeout(timer);
  }, [searchTxt]);

  const handleSearch = (searchTxt) => {
    if (searchTxt) {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTxt}&limit=5&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
        .then((resp) => resp.json())
        .then((result) => {
          setCityList(result);
        });
    }
  };

  const city = useMemo(
    () => {
      return Object.keys(location.locationDetail || {}).length
        ? `${location.locationDetail.city}, ${location.locationDetail.countryName}`
        : "";
    },
    [location]
  );

  const handleGetWeather = (item) => {
    getWeather(item);
  }

  return (
    <div className="header-main">
      <div className="location-header">
        <img src={frame} alt="Location" />
        <span className="city-name">{city}</span>
      </div>
      <img
        src={search}
        alt="Location"
        onClick={() => setShowSearch((prev) => !prev)}
      />
      {showSearch && (
        <div>
          <input
            value={searchTxt}
            placeholder="Search your location"
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <div className="city-list-container">
            {cityList.map((item) => {
              return (
                <div
                  className="city-tag"
                  onClick={() => handleGetWeather(item)}
                >
                  {`${item.name}, ${item.state}, ${item.country}`}{" "}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
