import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

import NotFound from './components/pages/NotFound' // Импорт страницы 404
import './components/pages/NotFound.css' // Стили для страницы 404


function App() {
  // return <NotFound /> // Страница 404
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

export default App;
