import "./DailyTemp.scss";

import dayIcon from "../assets/day.png";
import nightIcon from "../assets/night.png";
import rainIcon from "../assets/rain.png";

const DailyTemp = ({ dailyData, getDayName }) => {
  return (
    <div className="dailyTemp">
      {dailyData.map((item, index) => {
        return (
          <div className="item" key={index}>
            <p>{index === 0 ? "Today" : getDayName(item.date)}</p>
            <div className="item-info">
              <div>
                <img src={rainIcon} alt="icon" />
                <span>{item.day.daily_chance_of_rain}%</span>
              </div>
              <div>
                <span>{item.day.maxtemp_c}&#176;</span>
                <img src={dayIcon} alt="icon" />
              </div>
              <div>
                <img src={nightIcon} alt="icon" />
                <span>{item.day.mintemp_c}&#176;</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyTemp;
