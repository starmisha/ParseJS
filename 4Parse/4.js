window.onload = function () {

	function displaySavedImages() {
		const savedData = localStorage.getItem('savedImages');
		if (savedData) {
			const data = JSON.parse(savedData);
			displayImages(data);
		}
	}

	document.getElementById('requestButton').addEventListener('click', function () {
		const heightInput = document.getElementById('height').value.trim();
		const widthInput = document.getElementById('width').value.trim();
		const height = parseInt(heightInput);
		const width = parseInt(widthInput);
		let errorMessage = '';

		// Проверка номера страницы
		if (isNaN(height) || height < 100 || height > 300) {
			errorMessage += 'Введённая высота вне диапазона от 100 до 300';
		}

		// Проверка лимита
		if (isNaN(width) || width < 100 || width > 300) {
			if (errorMessage.length > 0) {
				errorMessage += ' и ширина вне диапазона от 100 до 300';
			} else {
				errorMessage += 'Ширина вне диапазона от 100 до 300';
			}
		}

		const resultDiv = document.getElementById('result');
		resultDiv.innerHTML = ''; // Очистка результата

		if (errorMessage.length > 0) {
			// Вывод сообщения об ошибке
			resultDiv.innerHTML = `<p class="error">${errorMessage}</p>`;
		} else {
			// Выполнение запроса
			const url = `https://dummyimage.com/${width}x${height}/000/fff&text=Sample+Image`;

			fetch(url)
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.blob(); // Получаем изображение в виде Blob
				})
				.then(blob => {
					const imageUrl = URL.createObjectURL(blob);
					resultDiv.innerHTML = `<img src="${imageUrl}" alt="Sample Image">`;
				})
				.catch(error => {
					console.error('Ошибка:', error);
					resultDiv.innerHTML = `<p class="error">Произошла ошибка при получении данных</p>`;
				});
		}
	});

	window.addEventListener('load', displaySavedImages);
}