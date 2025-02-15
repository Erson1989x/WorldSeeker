import style from "./CountryItem.module.css"

const CountryItem = ( { country } ) => {
  return (
    <li className={style.countryItem}>
        <span className={style.emoji}>{country.emoji}</span>
        <span className={style.country}>{country.country}</span>
    </li>
  )
}

export default CountryItem