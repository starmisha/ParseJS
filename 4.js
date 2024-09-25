window.onload = function () {

	function displaySavedImages() {
		const savedData = localStorage.getItem('savedImages');
		if (savedData) {
			const data = JSON.parse(savedData);
			displayImages(data);
		}
	}
	document.getElementById('requestButton').addEventListener('click', function () {

		const pageInput = document.getElementById('pageNumber').value.trim();
		const limitInput = document.getElementById('limit').value.trim();
		const pageNumber = parseInt(pageInput);
		const limit = parseInt(limitInput);
		let errorMessage = '';

		// Проверка номера страницы
		if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 10) {
			errorMessage += 'Номер страницы вне диапазона от 1 до 10';
		}

		// Проверка лимита
		if (isNaN(limit) || limit < 1 || limit > 10) {
			if (errorMessage.length > 0) {
				errorMessage += ' и лимит вне диапазона от 1 до 10';
			} else {
				errorMessage += 'Лимит вне диапазона от 1 до 10';
			}
		}

		const resultDiv = document.getElementById('result');
		resultDiv.innerHTML = ''; // Очистка результата

		if (errorMessage.length > 0) {
			// Вывод сообщения об ошибке
			resultDiv.innerHTML = `<p class="error">${errorMessage}</p>`;
		} else {
			// Выполнение запроса
			const url = `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`;

			fetch(url)
				.then(response => response.json())
				.then(data => {
					// Формирование галереи изображений
					let gallery = '<div class="images">';
					data.forEach(photo => {
						gallery += `
                <div>
                  <img src="${photo.thumbnailUrl}" alt="${photo.title}">
                  <p>${photo.title}</p>
                </div>
              `;
					});
					gallery += '</div>';
					resultDiv.innerHTML = gallery;
				})
				.catch(error => {
					console.error('Ошибка:', error);
					resultDiv.innerHTML = `<p class="error">Произошла ошибка при получении данных</p>`;
				});
		}
	});
	window.addEventListener('load', displaySavedImages);
}