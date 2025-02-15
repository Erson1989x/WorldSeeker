import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useState, useEffect } from "react";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:8000";

const App = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
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
    
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<CityList cities={cities} isLoading={loading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={loading} />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={loading} />} />
          <Route path="form" element={<p>Form</p>} />
         </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
