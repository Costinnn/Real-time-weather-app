import "./HourTemp.scss";

import icon from "../assets/sun.png";

const HourTemp = ({ hoursData }) => {
  return (
    <div className="frame">
      <div className="carousel">
        {hoursData.map((item, index) => {
          return (
            <div className="item" key={index}>
              <p>{item.time.slice(-5)}</p>
              <img src={icon} alt="" />
              <p>{item.temp_c} &#8451;</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourTemp;
