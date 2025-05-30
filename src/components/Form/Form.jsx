// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../Button/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../../context/CitiesContext";
export function convertToEmoji(countryCode) {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const { lat,lng} = useUrlPosition();
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities(); 
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocodeing, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
    if (!lat || !lng) return;
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
        );
        const data = await response.json();
        if(!data.countryCode) {
          throw new Error("That doesn't seem to be a valid location. Click somewhere else on the map.");
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode || ""));
      } catch (error) { 
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();   
  }, [lat,lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!cityName || !date)  return;

    const newCity = {
      cityName,
      date: date.toLocaleDateString("en-GB"),
      notes,
      position : {
        lat,
        lng
      },
      country,
      emoji
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocodeing) return <Spinner />;

  if(!lat || !lng) {
    return <Message message="Click on the map to select a location" />;
  }

  if(geocodingError) return <Message message={geocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
{  /*      <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />*/}
        <DatePicker 
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          selectedDates={date}
          
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
