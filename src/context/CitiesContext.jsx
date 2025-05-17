import { createContext, useContext, useEffect, useReducer, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    loading: false,
    currentCity: {},
    error: "",
    getCity: () => {},
    createCity: () => {},
    deleteCity: () => {},
};

const reducer = (state, action) => {
    switch (action.type) {
      case  "loading":
        return {
          ...state,
          loading: true,
        };
      case "cities/loaded":
        return {
          ...state,
          cities: action.payload,
          loading: false,
        };
      case "city/loaded":
        return {
          ...state,
          currentCity: action.payload,
          loading: false,
        };
      case "cities/created":
        return {
          ...state,
          cities: [...state.cities, action.payload],
          loading: false,
        };
      case "cities/deleted":
        return {
          ...state,
          cities: state.cities.filter((city) => city.id !== action.payload),
          loading: false,
        };
      case "rejected":
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
}

const CitiesProvider = ({ children }) => {
  const [{cities, loading, currentCity}, dispatch] = useReducer(reducer, initialState);
   // const [cities, setCities] = useState([]);
   // const [loading, setLoading] = useState(false);
   //  const [currentCity, setCurrentCity] = useState({});
  
    useEffect(() => {
      const fetchCities = async () => {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const data = await res.json();
          dispatch({ type: "cities/loaded", payload: data });
        } catch (error) {
          dispatch({ type: "rejected", payload: error.message });
        }
      };
  
      fetchCities();
    }, []);

    const getCity = async (id) => {
      dispatch({ type: "loading" });
        try {
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const data = await res.json();
          dispatch({ type: "city/loaded", payload: data });
        } catch (error) {
          dispatch({ type: "rejected", payload: error.message });
        }
    }

    const createCity = async (newCity) => {
      dispatch({ type: "loading" });
      try {
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
        dispatch({ type: "cities/created", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
  }

      const deleteCity = async (id) => {
        dispatch({ type: "loading" });
      try {
        await fetch(`${BASE_URL}/cities/${id}`,{
          method: "DELETE",
        });
        dispatch({ type: "cities/deleted", payload: id });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
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