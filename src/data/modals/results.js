// Completion modal text content (frontend stub). All strings here.
// Backgrounds are SVGs baked into the blue shape.
import bgTab1 from '../../assets/images/modals/completion-modal-1.svg'
import bgTab2 from '../../assets/images/modals/completion-modal-sec-1.svg'

export const completionData = {
  title: 'Первая снежинка',
  description: 'Ты только начал(а) путь! Даже одна снежинка может стать началом вьюги добрых дел',
  tabs: [
    {
      key: 'summary',
      background: bgTab1,
      buttonText: 'Поделиться',
    },
    {
      key: 'about',
      background: bgTab2,
      text: 'Проект создан Фондом защиты городских животных. «Мы защищаем права и интересы городских животных, которые сами не могут позаботиться о себе — кошек, собак, птиц и других животных нашего города»',
      buttonText: 'Помочь фонду',
    },
  ],
}


