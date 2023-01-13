import "./GeneralInfo.scss";

import pin from "../assets/pin.png";

const GeneralInfo = ({ cityName, cityData, iconNum }) => {
  return (
    <div className="container general-info">
      <div className="city-temp">
        <h2>{cityData.temp_c} &#8451;</h2>
        <div className="city-name">
          <p>{cityName}</p>
          <img src={pin} alt="pin" />
        </div>
        <p>{cityData.condition.text}</p>
      </div>

      <img
        className="temp-icon"
        src={require(`../assets/hourlyIcons/${iconNum}`)}
        alt="sun"
      />
    </div>
  );
};

export default GeneralInfo;
