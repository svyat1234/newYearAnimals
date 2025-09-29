import React, { useState, useEffect, useRef } from 'react';
import './UILayer.css';
import logoSvg from '../../assets/images/logo.svg';
import tgSvg from '../../assets/images/tg.svg';
import vkSvg from '../../assets/images/vk.svg';

const UILayer = ({ answeredCount = 0 }) => {
  const [isClueVisible, setIsClueVisible] = useState(false);
  const clueRef = useRef(null);

  useEffect(() => {
    if (!clueRef.current) return;

    // Определяем отступ в зависимости от размера экрана
    const isMobile = window.innerWidth <= 1024;
    const marginBottom = isMobile ? '-150px' : '-50px';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsClueVisible(true);
          } else {
            setIsClueVisible(false);
          }
        });
      },
      {
        rootMargin: `0px 0px ${marginBottom} 0px`,
        threshold: 0
      }
    );

    observer.observe(clueRef.current);

    return () => {
      if (clueRef.current) {
        observer.unobserve(clueRef.current);
      }
    };
  }, []);

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

        <div 
          ref={clueRef}
          className={`promo__clue ${isClueVisible ? 'promo__clue--visible' : ''}`}
        >
          <span className="promo__clue-text promo__clue-text--desktop">Нажимай на кружочки с цифрами, отвечай на вопросы</span>
          <span className="promo__clue-text promo__clue-text--mobile">Нажимай на кружочки – отвечай на вопросы</span>
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

            <a href="https://urbananimal.ru/" target="_blank" className="action-button">Наш сайт</a>

            <div className="footer__socials">
              <a href="https://t.me/urbananimal" target="_blank" className="footer__social-link">
                <img src={tgSvg} alt="Telegram" />
              </a>
              <a href="https://vk.com/urbananimal" target="_blank" className="footer__social-link">
                <img src={vkSvg} alt="VK" />
              </a>
            </div>

          </div>
          
        </div>
      </footer>

      {answeredCount > 0 && (
        <div className="score">
          <div className="score__star"></div>
          <span className="score__text">
            <span id="scoreCount">{answeredCount}</span>
            /9
          </span>
        </div>
      )}
    </div>
  );
};

export default UILayer;