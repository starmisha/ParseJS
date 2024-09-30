window.onload = function () {
	const limitInput = document.getElementById('limitInput');
	const sendButton = document.getElementById('sendRequest');
	const resultDiv = document.getElementById('result');
	console.log(sendButton)
	sendButton.addEventListener('click', () => {
		const limit = parseInt(limitInput.value);

		if (isNaN(limit) || limit < 1 || limit > 10) {
			resultDiv.textContent = 'Число вне диапазона от 1 до 10';
			return;
		}

		const xhr = new XMLHttpRequest();
		const url = `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`;

		xhr.open('GET', url);

		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) {
				try {
					const data = JSON.parse(xhr.response);
					resultDiv.innerHTML = ''; // Очищаем предыдущий результат
					data.forEach(item => {
						const img = document.createElement('img');
						img.src = item.thumbnailUrl;
						img.alt = item.title;
						img.style.maxWidth = '100px';  // устанавливаем максимальную ширину для миниатюр
						img.style.marginRight = '10px'; // добавляем отступ справа
						resultDiv.appendChild(img);
					});
				} catch (error) {
					resultDiv.textContent = 'Ошибка парсинга JSON: ' + error.message;
				}
			} else {
				resultDiv.textContent = 'Ошибка запроса: ' + xhr.status + ' ' + xhr.statusText;
			}
		};

		xhr.onerror = function () {
			resultDiv.textContent = 'Ошибка сети';
		};

		xhr.send();
	});

}

