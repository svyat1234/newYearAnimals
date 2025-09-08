import React from 'react';
import './UILayer.css';

const UILayer = () => {
  return (
    <div className="ui-layer">
      {/* Header */}
      <header className="header container">
        <a href="#" className="header__logo">
          <img src="/images/logo.svg" alt="Logo" />
        </a>

        <a href="#" className="header__btn">Помочь фонду</a>
      </header>

      {/* Promo */}
      <section className="promo container">
        <h1 className="promo__title">Праздники без опасности: забота о питомцах</h1>
        <p className="promo__text">Полезные советы о том, как уберечь животных от праздничных опасностей и сделать праздник комфортным для всех</p>
        <div className="promo__btns">
          <button className="promo__btn">Читать статью</button>
          <button className="promo__btn">Пройти тест</button>
        </div>


      </section>
    </div>
  );
};

export default UILayer;