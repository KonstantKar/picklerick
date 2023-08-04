import React, { useEffect, useMemo, useState } from "react";
import "./Characters.css";
import axios from "axios";
import Inputs from "./inputs/Inputs";
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        character.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
        (genderFilter === "" || character.gender === genderFilter) &&
        (statusFilter === "" || character.status === statusFilter) &&
        (speciesFilter === "" || character.species === speciesFilter)
      );
    });
  }, [
    characters,
    nameFilter,
    genderFilter,
    statusFilter,
    typeFilter,
    speciesFilter,
  ]);

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

  return (
    <section id="Characters">
      <h2>Один лучше другого!</h2>
      <Inputs
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
        filteredCharacters={filteredCharacters}
      />
      <div className="container Characters__container">
        <div className="Characters__items">
          {/* ГЕРОИ */}
          {filteredCharacters.map((character) => (
            <article className="Characters__item" key={character.id}>
              <div className="Characters__item-image">
                <img src={character.image} alt="" />
              </div>
              <h3>Имя: {character.name}</h3>
              <h5>Вид: {character.species}</h5>
              <h5>Гендер: {character.gender}</h5>
              <h5>Статус: {character.status}</h5>
              {character.type && <h5>Тип:{character.type}</h5>}
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
