# Архитектура проекта (обновлено)

## Слои страницы

```
GameBoard (контейнер)
├── BackgroundLayer    (z-index: 0)  — фоновая SVG-картинка, находится в потоке и задает высоту страницы
├── MiddlegroundLayer  (z-index: 10) — персонажи, деревья, объекты (поверх фона)
├── ForegroundLayer    (z-index: 20) — тропинка/передний план
├── InteractiveLayer   (z-index: 30) — кликабельные элементы (цифры и т.п.)
├── UILayer            (z-index: 40) — заголовки, кнопки, логотип
└── ModalSystem        (z-index: 100) — модальные окна
```

### Ключевые принципы (важно)
- Фон задает скролл: `BackgroundLayer` в потоке, `<img width:100%; height:auto;>`.
- Все остальные слои — `position:absolute; inset:0;` внутри `GameBoard (position:relative)`.
- Координаты берем из макета (px при ширине 1920) и переводим в vw: `(px/1920)*100vw` (для Y тоже через ширину, чтобы пропорции сохранялись).
- Элементы (спрайты) не хардкодим в JSX — рендерим из массива `src/data/sprites.js`.
- Именование id и CSS-классов — kebab-case; JS переменные — camelCase.

## Позиционирование элементов (спрайтов)

- Координаты: пиксели из макета при базе 1920px.
- Перевод в единицы макета, завязанные на ширину экрана:
  - по X: `left/right = (px / 1920) * 100vw`
  - по Y: `top = (px / 1920) * 100vw`
- Большие значения (например, `top: 2507px`) — нормально для длинного фона.

Пример CSS:
```
img.sprite {
  position: absolute;
  top: calc((var(--top) / 1920) * 100vw);
  left: calc((var(--left) / 1920) * 100vw);
}
```

## Рендер большого количества элементов

Чтобы не добавлять каждую картинку вручную в JSX, используем конфиг спрайтов:

- Файл данных: `src/data/sprites.js`
- Массив с путями (из `public/`) и координатами:

```js
export const sprites = [
  { id: 'couple-with-dog', src: '/images/couple-with-dog.svg', top: 552, right: 283, z: 10, cls: 'character' }
];
```

- Рендер в `MiddlegroundLayer.jsx`:

{% raw %}
```jsx
{sprites.map(item => (
 <div className="middleground-layer">
      {sprites.map(item => (
        <QueuedImage
          key={item.id}
          src={item.src}
          alt=""
          imgProps={{ className: `sprite ${item.cls || ''}` }}
          style={{
            position: 'absolute',
            top: `calc(${item.top / 1920 * 100}vw)`,
            ...(item.left != null && { left: `calc(${item.left / 1920 * 100}vw)` }),
            ...(item.right != null && { right: `calc(${item.right / 1920 * 100}vw)` }),
            ...(item.width != null && { width: `calc(${item.width / 1920 * 100}vw)`, height: 'auto' }),
            zIndex: item.z ?? 1
          }}
        />
      ))}
    </div>
))}
```
{% endraw %}

## Именование

- id спрайтов: kebab-case (строчные буквы и дефисы): `couple-with-dog`, `tree-pine-big-right`.
- CSS классы: kebab-case.
- JS переменные/константы: camelCase (`sprites`, `gameConfig`).

## Файловая структура (актуальная)

```
src/
├── components/
│   ├── GameBoard.jsx           # Корневой контейнер слоев, собирает всю страницу
│   ├── GameBoard.css           # Общие стили контейнера слоев (z-index, позиционирование)
│   ├── layers/
│   │   ├── BackgroundLayer.jsx # Фон: <img src="/background.svg" /> — в потоке
│   │   ├── BackgroundLayer.css # Стили фонового изображения (width:100%, height:auto)
│   │   ├── MiddlegroundLayer.jsx# Рендер спрайтов из src/data/sprites.js
│   │   ├── MiddlegroundLayer.css# Абсолютный слой, pointer-events и базовые стили спрайтов
│   │   ├── ForegroundLayer.jsx # Элементы переднего плана (например, тропинка)
│   │   ├── ForegroundLayer.css # Абсолютный слой переднего плана
│   │   ├── InteractiveLayer.jsx# Интерактивные элементы (цифры и т.д.)
│   │   └── InteractiveLayer.css# Абсолютный слой для интерактива
│   ├── ui/
│   │   ├── UILayer.jsx         # Заголовки, кнопки, логотип (UI поверх)
│   │   └── UILayer.css         # Абсолютный слой UI
│   └── modals/
│       ├── ModalSystem.jsx     # Система модальных окон
│       └── ModalSystem.css     # Стили модального слоя
├── data/
│   ├── gameConfig.js           # Общие параметры (например, базовая ширина макета)
│   └── sprites.js              # Массив всех элементов с координатами
└── index.css                   # Глобальные базовые стили (reset, базовая типографика)
```

## Куда класть изображения

- Фон: `public/background.svg`
- Остальные: `public/images/...` (например, `public/images/couple-with-dog.svg`, `public/images/trees/pine-big.svg`).

## Краткий чек-лист добавления элемента

1) Положи файл в `public/images/...`
2) Добавь объект в `src/data/sprites.js` с координатами из макета (px)
3) Проверь, что элемент появился и масштабируется при изменении ширины экрана