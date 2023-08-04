import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h1>Персонажи Рика и Морти</h1>
        <div className="art">
          <img
            src="https://i.pinimg.com/originals/db/f2/cb/dbf2cbffc98ca1af58f46d83e1d4e208.jpg"
            alt="image"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
