import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
  
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

    const getCity = async (id) => {
        try {
          setLoading(true);
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const data = await res.json();
          setCurrentCity(data);
        } catch (error) {
          console.error("Error loading cities:", error);
        } finally {
          setLoading(false);
        }
    }

    const createCity = async (newCity) => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCity),
        });
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await res.json();
        setCities((prevCities) => [...prevCities, data]);
      } catch (error) {
        console.error("Error loading cities:", error);
      } finally {
        setLoading(false);
      }
  }

      const deleteCity = async (id) => {
      try {
        setLoading(true);
        await fetch(`${BASE_URL}/cities/${id}`,{
          method: "DELETE",
        });
        setCities((prevCities) => prevCities.filter((city) => city.id !== id));
      } catch (error) {
        console.error("Error deleting cities:", error);
      } finally {
        setLoading(false);
      }
  }

    return (
        <CitiesContext.Provider value={{ cities, loading, currentCity, getCity,createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    );
}

const useCities = () => {
    const context = useContext(CitiesContext);
    if(context === undefined) {
        throw new Error("CitiesContext was used outside of its provider");
    }
    return context;
}

export { CitiesProvider, useCities };