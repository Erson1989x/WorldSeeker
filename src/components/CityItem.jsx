import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) => {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  } catch (error) {
    return "Invalid date";
  }
};

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  
  const handleClick = (e) => {
  e.preventDefault();
  deleteCity(id);
}

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
        <button className={styles.deletebtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
