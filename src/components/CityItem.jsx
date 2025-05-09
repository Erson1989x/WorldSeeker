import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id=== currentCity.id ? styles["cityItem--active"] : ""}`}
        to={position && position.lat && position.lng 
          ? `${id}?lat=${position.lat}&lng=${position.lng}` 
          : `${id}`
        }
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deletebtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
