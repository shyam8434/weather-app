import "./header.css";
import { useMemo, useState } from "react";
import frame from "../../Assets/Frame.svg";
import search from "../../Assets/Search.svg";
import AsyncSelect from "react-select/async";

const Header = ({ location, onChange }) => {
  const [showSearch, setShowSearch] = useState(false);

  const city = useMemo(() => {
    return Object.keys(location || {}).length
      ? `${location.name}, ${location.state}, ${location.country}`
      : "";
  }, [location]);


  let timer = null;

  const loadOptions = (inputValue) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.REACT_APP_WEATHER_KEY}`
          );
          const data = await res.json();

          if (data.cod === "400") {
            reject("No data")
            return [];
          }
          data.forEach((element) => {
            element.label = `${element.name}, ${element.state}, ${element.country}`;
            element.value = element;
          });
          resolve(data);
        } catch (error) {
          console.error(error);
          reject("No data");
        }
      }, 2000);
    });
  };

  const handleOnSelect = (e) => {
    onChange(e.value);
    setShowSearch(false);
  };

  return (
    <div className="header-main">
      <div className="location-header">
        <img src={frame} alt="Location" />
        {showSearch ? (
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            autosize={true}
            onChange={handleOnSelect}
            width={300}
            styles={{
              menu: (base) => ({
                ...base,
                width: "max-content",
                minWidth: "100%",
                color: "black",
              }),
              container: (base) => ({
                ...base,
                width: "max-content",
                minWidth: "300px",
              }),
            }}
          />
        ) : (
          <span className="city-name">{city}</span>
        )}
      </div>
      <div className="search-container">
        <img
          src={search}
          alt="Location"
          onClick={() => setShowSearch((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default Header;
