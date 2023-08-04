import React, { useEffect, useMemo, useState } from "react";
import "./Characters.css";
import axios from "axios";
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    charactersData();
  }, []);

  const charactersData = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        character.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
        (genderFilter === "" || character.gender === genderFilter) &&
        (statusFilter === "" || character.status === statusFilter)
      );
    });
  }, [characters, nameFilter, genderFilter, statusFilter, typeFilter]);

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

  return (
    <section id="Characters">
      <h2>Один лучше другого!</h2>
      {/*Кнопки фильтрации */}
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
          placeholder="Type"
          name="type"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        />
      </div>
      <div className="container Characters__container">
        <div className="Characters__items">
          {/* ГЕРОИ */}
          {filteredCharacters.map((character) => (
            <article className="Characters__item" key={character.id}>
              <div className="Characters__item-image">
                <img src={character.image} alt="" />
              </div>
              <h3>Имя:{character.name}</h3>
              <h5>Гендер: {character.gender}</h5>
              <h5>{character.status}</h5>
              <h5>{character.type}</h5>
              <div className="experience__buttons" target="_blank">
                <a
                  href="https://github.com/KonstantKar/vk"
                  className="btn btn-primary"
                >
                  Посмотреть информацию
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Characters;
