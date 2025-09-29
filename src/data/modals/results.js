// Completion modal text content (frontend stub). All strings here.
// Backgrounds are SVGs baked into the blue shape.
import desktopBgSummary1 from '../../assets/images/modals/completion-modal-1.svg'
import desktopBgAbout1 from '../../assets/images/modals/completion-modal-sec-1.svg'
import mobileBgSummary1 from '../../assets/images/modals/completion-modal-mobile-1.svg'
import mobileBgAbout1 from '../../assets/images/modals/completion-modal-mobile-sec-1.svg'

// Цвета крестиков для каждой модалки
export const modalCloseColors = [
  '#7A9AEA', // Первая модалка
  '#5CB4A4', // Вторая модалка  
  '#E57565', // Третья модалка
  '#CB90BE', // Четвертая модалка
  '#F3BB53', // Пятая модалка
]

// Данные для модалок завершения (массив объектов)
export const completionData = [
  {
    title: 'Первая снежинка',
    result: '2/9',
    description: 'Ты только начал(а) путь! Даже одна снежинка может стать началом вьюги добрых дел',
  },
  {
    title: 'Заголовок 2',
    result: '4/9',
    description: 'Ты только начал(а) путь! Даже одна снежинка может стать началом вьюги добрых дел',
  },
  {
    title: 'Заголовок 3',
    result: '6/9', 
    description: 'Ты только начал(а) путь! Даже одна снежинка может стать началом вьюги добрых дел',
  },
  {
    title: 'Заголовок 4',
    result: '8/9',
    description: 'Ты только начал(а) путь! Даже одна снежинка может стать началом вьюги добрых дел',
  },
  {
    title: 'Заголовок 5',
    result: '9/9',
    description: 'Ты только начал(а) путь! Даже одна снежинка может стать началом вьюги добрых дел',
  },
]

// Общие данные для табов (одинаковые для всех модалок)
export const completionTabs = [
  {
    key: 'summary',
    background: desktopBgSummary1,
    backgroundMobile: mobileBgSummary1,
  },
  {
    key: 'about',
    background: desktopBgAbout1,
    backgroundMobile: mobileBgAbout1,
    text: 'Проект создан <span class="highlight-underline">Фондом защиты городских животных.</span> «Мы защищаем права и интересы городских животных, которые сами не могут позаботиться о себе — кошек, собак, птиц и других животных нашего города»',
  },
]

