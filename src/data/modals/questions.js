// Data scaffold for 9 question modals
// image paths can be absolute from /public or imported via new URL(..., import.meta.url)

// Импорт изображений
import modal5Image from '../../assets/images/modal-5.svg'

export const questionModals = [
  { 
    id: 1, 
    subtitle: 'Ситуация 5', 
    title: 'В новогодние праздники собака бегает по улице', 
    image: modal5Image,
    correctAnswer: 2,
    choices: [
      { text: 'Возможно, она гуляет сама по себе — угощу ее, пусть гуляет', isCorrect: false, explanation: 'Неправильный вариант, самовыгул запрещен законом, животное скорее всего попало в беду (испугавшись салюта) либо находится у недобросовестного владельца' },
      { text: 'Отдам собаку человеку, который представится владельцем', isCorrect: true, explanation: 'Правильный вариант, лучше придержать животное, позвонить по номеру с адресника, затем обратиться в ветклинику, сканировать чип, разместить объявление' },
      { text: 'Поймаю либо обращусь к рекоме    ндованному ловцу, проверю в клинике чип, найду передержку и подам объявление в рекомендованные сообщества', isCorrect: false, explanation: 'Правильный вариант, лучше придержать животное, позвонить по номеру с адресника, затем обратиться в ветклинику, сканировать чип, разместить объявление' }
    ]
  },
  { 
    id: 2, 
    subtitle: 'Ситуация 2', 
    title: 'Вопрос 2', 
    image: '',
    correctAnswer: 2,
    choices: [
      { text: 'Вариант ответа 1', isCorrect: false, explanation: 'Объяснение для варианта 1' },
      { text: 'Вариант ответа 2', isCorrect: true, explanation: 'Объяснение для варианта 2' },
      { text: 'Вариант ответа 3', isCorrect: false, explanation: 'Объяснение для варианта 3' }
    ]
  },
  { 
    id: 3, 
    subtitle: 'Ситуация 3', 
    title: 'Вопрос 3', 
    image: '',
    correctAnswer: 2,
    choices: [
      { text: 'Вариант ответа 1', isCorrect: false, explanation: 'Объяснение для варианта 1' },
      { text: 'Вариант ответа 2', isCorrect: true, explanation: 'Объяснение для варианта 2' },
      { text: 'Вариант ответа 3', isCorrect: false, explanation: 'Объяснение для варианта 3' }
    ]
  },
  { 
    id: 4, 
    subtitle: 'Ситуация 4', 
    title: 'Вопрос 4', 
    image: '',
    correctAnswer: 2,
    choices: [
      { text: 'Вариант ответа 1', isCorrect: false, explanation: 'Объяснение для варианта 1' },
      { text: 'Вариант ответа 2', isCorrect: true, explanation: 'Объяснение для варианта 2' },
      { text: 'Вариант ответа 3', isCorrect: false, explanation: 'Объяснение для варианта 3' }
    ]
  },
  { 
    id: 5, 
    subtitle: 'Ситуация 5', 
    title: 'В новогодние праздники собака бегает по улице', 
    image: modal5Image,
    correctAnswer: 2,
    choices: [
      { text: 'Возможно, она гуляет сама по себе — угощу ее, пусть гуляет', isCorrect: false, explanation: 'Неправильный вариант, самовыгул запрещен законом, животное скорее всего попало в беду (испугавшись салюта) либо находится у недобросовестного владельца' },
      { text: 'Отдам собаку человеку, который представится владельцем', isCorrect: true, explanation: 'Правильный вариант, лучше придержать животное, позвонить по номеру с адресника, затем обратиться в ветклинику, сканировать чип, разместить объявление' },
      { text: 'Поймаю либо обращусь к рекомендованному ловцу, проверю в клинике чип, найду передержку и подам объявление в рекомендованные сообщества', isCorrect: false, explanation: 'Правильный вариант, лучше придержать животное, позвонить по номеру с адресника, затем обратиться в ветклинику, сканировать чип, разместить объявление' }
    ]
  },
  { 
    id: 6, 
    subtitle: 'Ситуация 6', 
    title: 'Вопрос 6', 
    image: '',
    correctAnswer: 2,
    choices: [
      { text: 'Вариант ответа 1', isCorrect: false, explanation: 'Объяснение для варианта 1' },
      { text: 'Вариант ответа 2', isCorrect: true, explanation: 'Объяснение для варианта 2' },
      { text: 'Вариант ответа 3', isCorrect: false, explanation: 'Объяснение для варианта 3' }
    ]
  },
  { 
    id: 7, 
    subtitle: 'Ситуация 7', 
    title: 'Вопрос 7', 
    image: '',
    correctAnswer: 2,
    choices: [
      { text: 'Вариант ответа 1', isCorrect: false, explanation: 'Объяснение для варианта 1' },
      { text: 'Вариант ответа 2', isCorrect: true, explanation: 'Объяснение для варианта 2' },
      { text: 'Вариант ответа 3', isCorrect: false, explanation: 'Объяснение для варианта 3' }
    ]
  },
  { 
    id: 8, 
    subtitle: 'Ситуация 8', 
    title: 'Вопрос 8', 
    image: '',
    correctAnswer: 2,
    choices: [
      { text: 'Вариант ответа 1', isCorrect: false, explanation: 'Объяснение для варианта 1' },
      { text: 'Вариант ответа 2', isCorrect: true, explanation: 'Объяснение для варианта 2' },
      { text: 'Вариант ответа 3', isCorrect: false, explanation: 'Объяснение для варианта 3' }
    ]
  },
  { 
    id: 9, 
    subtitle: 'Ситуация 9', 
    title: 'Вопрос 9', 
    image: '',
    correctAnswer: 2,
    choices: [
      { text: 'Вариант ответа 1', isCorrect: false, explanation: 'Объяснение для варианта 1' },
      { text: 'Вариант ответа 2', isCorrect: true, explanation: 'Объяснение для варианта 2' },
      { text: 'Вариант ответа 3', isCorrect: false, explanation: 'Объяснение для варианта 3' }
    ]
  }
]


