import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={styles.ul}>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink className={styles.ctaLink} to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
