import React from 'react';
import './UILayer.css';
import logoSvg from '../../assets/images/logo.svg';
import tgSvg from '../../assets/images/tg.svg';
import vkSvg from '../../assets/images/vk.svg';

const UILayer = () => {
  return (
    <div className="ui-layer">
      {/* Header */}
      <header className="header container">
        <a href="#" className="header__logo">
          <img src={logoSvg} alt="Logo" />
        </a>

        <a href="#" className="header__btn link">Помочь фонду</a>
      </header>

      {/* Promo */}
      <section className="promo container">
        <h1 className="promo__title">Праздники без&nbsp;опасности: забота о питомцах</h1>
        <p className="promo__text">Полезные советы о том, как уберечь животных от праздничных опасностей и сделать праздник комфортным для всех</p>
        <div className="promo__btns">
          <button className="action-button">Читать статью</button>
          <button className="action-button">Пройти тест</button>
        </div>

        <div className="promo__clue">
          <span className="promo__clue-text">Нажимай на кружочки с цифрами, отвечай на вопросы</span>
        </div>
        
      </section>

      <footer className="footer container">
        <h2 className="footer__title">Фонд защиты городских животных</h2>
        <p className="footer__text">
          Защищаем права и интересы городских животных. Тех москвичей, которые сами о себе позаботиться не могут — кошек, собак, птиц и других животных нашего города
        </p>

        <div className="footer__content">
          <div className="footer__copyright-nav">
            <span className="footer__copyright-text">© 2025</span>

            <nav className="footer__nav">

              <div className="footer__nav-link-block">
                <span className="footer__nav-title">Дизайн</span>
                <a href="#" className="footer__nav-link link">Коллектив группа</a>
              </div>

              <div className="footer__nav-link-block">
                <span className="footer__nav-title">Разработка</span>
                <a href="#" className="footer__nav-link link">Название</a>
              </div>

            </nav>
          </div>

          <div className="footer__links">

            <a href="#" className="action-button">Наш сайт</a>

            <div className="footer__socials">
              <a href="#" className="footer__social-link">
                <img src={tgSvg} alt="Telegram" />
              </a>
              <a href="#" className="footer__social-link">
                <img src={vkSvg} alt="VK" />
              </a>
            </div>

          </div>
          
        </div>
      </footer>

      <div className="score">
        <div className="score__star"></div>
        <span className="score__text">

          <span id="scoreCount">1</span>
          /9

        </span>
      </div>
    </div>
  );
};

export default UILayer;