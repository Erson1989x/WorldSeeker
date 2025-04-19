import { createContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchCities = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const data = await res.json();
          setCities(data);
        } catch (error) {
          console.error("Error loading cities:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{ cities, loading }}>
            {children}
        </CitiesContext.Provider>
    );
}

export { CitiesContext, CitiesProvider };