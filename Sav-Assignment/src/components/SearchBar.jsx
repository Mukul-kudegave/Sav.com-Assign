import React from "react";

const SearchBar = ({ items, setFilteredItems }) => {
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search items..."
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
