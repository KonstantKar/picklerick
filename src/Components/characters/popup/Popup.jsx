import React from "react";
import "./Popup.css";
import { AiFillCloseCircle } from "react-icons/ai";
const Popup = ({ selectedCharacter, closePopup }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>Полная информация о персонаже:</p>
        <img
          src={selectedCharacter.image}
          alt="Character"
          className="popup-image"
        />
        <h3>Имя: {selectedCharacter.name}</h3>
        <p>Вид: {selectedCharacter.species}</p>
        <p>Гендер: {selectedCharacter.gender}</p>
        <p>Статус: {selectedCharacter.status}</p>
        {selectedCharacter.type && <p>Тип:{selectedCharacter.type}</p>}
        {selectedCharacter.origin.name && (
          <p>Планета:{selectedCharacter.origin.name}</p>
        )}
        <p>Присутствовал в {selectedCharacter.episode.length} эпизодах</p>

        <button onClick={closePopup} className="btn">
          Закрыть информацию <AiFillCloseCircle />
        </button>
      </div>
    </div>
  );
};

export default Popup;
