import "./HourTemp.scss";

const HourTemp = ({ hoursData }) => {
  return (
    <div className="frame">
      <div className="carousel">
        {hoursData.map((item, index) => {
          return (
            <div className="item" key={index}>
              <p>{item.time.slice(-5)}</p>
              <img
                src={require(`../assets/hourlyIcons/${item.condition.icon.slice(
                  -7
                )}`)}
                alt="icon"
              />
              <p>{item.temp_c}&#176;</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourTemp;
