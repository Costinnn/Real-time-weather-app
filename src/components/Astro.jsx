import "./Astro.scss";

import sunrise from '../assets/sunrise.png'
import sunset from '../assets/sunset.png'

const Astro = ({astroData}) => {
  return (
    <div className="astroData">
      <div>
        <p>{astroData.sunrise}</p>
        <img src={sunrise} alt="sunrise" />
      </div>
      <div>
        <p>{astroData.sunset}</p>
        <img src={sunset} alt="sunset" />
      </div>
    </div>
  );
};

export default Astro;
