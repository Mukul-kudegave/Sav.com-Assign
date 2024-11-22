import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ItemList from "./components/ItemList";
import Pagination from "./components/Pagination";
import ReCAPTCHA from "react-google-recaptcha";

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const fetchItems = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };


  const handleReCAPTCHA = (value) => {
    if (value) setIsVerified(true);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const updateItems = (newOrder) => {
    const updatedItems = [...filteredItems];
    updatedItems.splice(startIndex, ITEMS_PER_PAGE, ...newOrder);
    setFilteredItems(updatedItems);
  };

  return (
    <div className="app-container">
      <h1>Sav.com</h1>
      {!isVerified ? (
        <ReCAPTCHA
          sitekey="6Lf5MIcqAAAAAN-GjE0lvcVHtPxxiKif6Mtj87UB"
          onChange={handleReCAPTCHA}
        />
      ) : (
        <>
          <button onClick={fetchItems} className="fetch-button">
            Load Items
          </button>
          <SearchBar items={items} setFilteredItems={setFilteredItems} />
          <Pagination
            totalItems={filteredItems.length}
            itemsPerPage={ITEMS_PER_PAGE}
            setCurrentPage={setCurrentPage}
          />
          <ItemList items={currentItems} updateItems={updateItems} />
          <Pagination
            totalItems={filteredItems.length}
            itemsPerPage={ITEMS_PER_PAGE}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
