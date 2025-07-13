const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrContainer = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-btn');

// Генерация QR-кода
generateBtn.addEventListener('click', () => {
  const text = qrInput.value.trim();
  
  if (!text) {
    alert("Введите текст или ссылку!");
    return;
  }

  qrContainer.innerHTML = '';
  
  QRCode.toCanvas(qrContainer, text, { width: 200 }, (error) => {
    if (error) {
      console.error(error);
      alert("Ошибка генерации QR-кода!");
    } else {
      const canvas = qrContainer.querySelector('canvas');
      downloadBtn.href = canvas.toDataURL('image/png');
      downloadBtn.classList.remove('hidden');
      
      // Если открыто в Telegram WebApp
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.sendData(canvas.toDataURL('image/png'));
      }
    }
  });
});

// Проверка, открыто ли в Telegram WebApp
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.expand(); // Раскрываем на весь экран
  tg.MainButton.setText("Отправить QR").show().onClick(() => {
    generateBtn.click();
  });
}