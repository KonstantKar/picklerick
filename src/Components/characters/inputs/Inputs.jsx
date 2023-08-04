import React, { useMemo, useState } from "react";

const Inputs = ({
  nameFilter,
  setNameFilter,
  genderFilter,
  setGenderFilter,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  speciesFilter,
  setSpeciesFilter,
  filteredCharacters,
}) => {
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSpeciesFilterChange = (event) => {
    setSpeciesFilter(event.target.value);
  };
  return (
    <div className="inputArea">
      <input
        type="text"
        placeholder="Поиск по имени"
        name="name"
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <input
        type="text"
        placeholder="Type"
        name="type"
        value={typeFilter}
        onChange={handleTypeFilterChange}
      />
      <input
        type="text"
        placeholder="Гендер:Male/Female"
        name="gender"
        value={genderFilter}
        onChange={handleGenderFilterChange}
      />
      <input
        type="text"
        placeholder="Cтатус:Alive/Dead/Unknown"
        name="status"
        value={statusFilter}
        onChange={handleStatusFilterChange}
      />

      <input
        type="text"
        placeholder="Вид:Human/Alien"
        name="species"
        value={speciesFilter}
        onChange={handleSpeciesFilterChange}
      />
    </div>
  );
};

export default Inputs;
