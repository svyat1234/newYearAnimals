// src/services/cloudPayments.js

// URL виджета из документации CloudPayments
const CP_WIDGET_URL = 'https://widget.cloudpayments.ru/bundles/cloudpayments.js';

// Переменная для хранения промиса загрузки, чтобы не загружать скрипт повторно
let loadPromise = null;

/**
 * Динамически загружает скрипт виджета CloudPayments.
 * @returns {Promise<object>} Промис, который разрешается объектом `cp` виджета.
 */
function loadCloudPaymentsWidget() {
  // Если виджет уже загружен, возвращаем его
  if (window.cp && window.cp.CloudPayments) {
    return Promise.resolve(window.cp);
  }

  // Если загрузка уже идет, возвращаем существующий промис
  if (loadPromise) {
    return loadPromise;
  }

  // Начинаем загрузку
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = CP_WIDGET_URL;
    script.async = true;
    
    script.onload = () => {
      if (window.cp && window.cp.CloudPayments) {
        resolve(window.cp);
      } else {
        reject(new Error('CloudPayments widget failed to load.'));
      }
    };

    script.onerror = () => {
      reject(new Error('Failed to load CloudPayments script.'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

/**
 * Инициирует процесс оплаты через виджет CloudPayments.
 * @param {object} paymentData - Данные для платежа.
 * @returns {Promise<object>} Промис, который разрешается результатом операции.
 */
export async function pay(paymentData) {
  // 1. Загружаем виджет
  const cp = await loadCloudPaymentsWidget();

  // 2. Получаем Public ID из переменных окружения
  // Это самый безопасный способ хранить ключ.
  // Для локальной разработки используем тестовый ключ из документации.
  const publicId = import.meta.env.VITE_CLOUDPAYMENTS_PUBLIC_ID || 'test_api_00000000000000000000001';

  return new Promise((resolve) => {
    // 3. Инициализируем виджет
    const widget = new cp.CloudPayments();

    // 4. Вызываем метод оплаты `pay`
    widget.pay(
      'charge', // Тип операции - оплата
      {
        // Параметры платежа из документации
        publicId,
        description: paymentData.description || 'Пожертвование в фонд',
        amount: Number(paymentData.amount),
        currency: paymentData.currency || 'RUB',
        accountId: paymentData.email, // ID пользователя (используем email)
        email: paymentData.email,
        skin: "classic", // Дизайн виджета
        data: {
          ...paymentData.data // Любые доп. данные
        }
      },
      { 
        // Коллбэки для обработки результатов
        onSuccess: (options) => resolve({ success: true, options }),
        onFail: (reason, options) => resolve({ success: false, reason, options }),
      }
    );
  });
}
