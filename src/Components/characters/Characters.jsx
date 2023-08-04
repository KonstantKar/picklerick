import React, { useEffect, useMemo, useState } from "react";
import "./Characters.css";
import axios from "axios";
import Inputs from "./inputs/Inputs";
import Popup from "./popup/Popup";
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //Логика отображения Popup
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //Общая фильтрация
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

  //Запрос на получени данных с API
  const charactersData = async () => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}`
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  //Функция открытия и закрытия Popup выбранного персонажа
  const handleInfoButtonClick = (character) => {
    setSelectedCharacter(character);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Функции листания страниц
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  //Отслеживание страницы
  useEffect(() => {
    charactersData();
  }, [currentPage]);

  return (
    <section id="Characters">
      <h2>Найди нужного тебе!</h2>
      {/*Так как изначально API даёт только 20 персонажей, пришлось сделать пагинацию*/}
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn"
        >
          Предыдущая страница
        </button>
        <button
          onClick={handleNextPage}
          className="btn"
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Следующая страница
        </button>
      </div>
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
              {/* Добавьте другие свойства персонажа, которые хотите показать */}
              <div className="experience__buttons" target="_blank">
                <a
                  onClick={() => handleInfoButtonClick(character)}
                  className="btn btn-primary"
                >
                  Посмотреть информацию
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      {/* Popup с полной информацией о персонаже */}
      {isPopupOpen && selectedCharacter && (
        <Popup selectedCharacter={selectedCharacter} closePopup={closePopup} />
      )}
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn"
        >
          Предыдущая страница
        </button>
        <button
          onClick={handleNextPage}
          className="btn"
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Следующая страница
        </button>
      </div>
    </section>
  );
};

export default Characters;
