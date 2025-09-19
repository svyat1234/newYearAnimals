// Completion modal text content (frontend stub). All strings here.
// Backgrounds are SVGs baked into the blue shape.
import desktopBgSummary1 from '../../assets/images/modals/completion-modal-1.svg'
import desktopBgAbout1 from '../../assets/images/modals/completion-modal-sec-1.svg'
import mobileBgSummary1 from '../../assets/images/modals/completion-modal-mobile-1.svg'
import mobileBgAbout1 from '../../assets/images/modals/completion-modal-mobile-sec-1.svg'

export const completionData = {
  title: 'Первая снежинка',
  result: '2/9',
  description: 'Ты только начал(а) путь! Даже одна снежинка может стать началом вьюги добрых дел',
  tabs: [
    {
      key: 'summary',
      background: desktopBgSummary1,
      backgroundMobile: mobileBgSummary1,
      buttonText: 'Поделиться',
    },
    {
      key: 'about',
      background: desktopBgAbout1,
      backgroundMobile: mobileBgAbout1,
      text: 'Проект создан <span class="highlight-underline">Фондом защиты городских животных.</span> «Мы защищаем права и интересы городских животных, которые сами не могут позаботиться о себе — кошек, собак, птиц и других животных нашего города»',
      buttonText: 'Помочь фонду',
    },
  ],
}

