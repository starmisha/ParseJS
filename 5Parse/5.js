document.addEventListener('DOMContentLoaded', () => {
	const pageNumberInput = document.getElementById('pageNumber');
	const limitInput = document.getElementById('limit');
	const requestButton = document.getElementById('requestButton');
	const errorMessage = document.getElementById('errorMessage');
	const photoList = document.getElementById('photoList');

	// Проверка на валидность чисел
	function isValidNumber(value) {
		return !isNaN(value) && value >= 1 && value <= 10;
	}

	// Обработка клика на кнопку
	requestButton.addEventListener('click', () => {
		const pageNumber = parseInt(pageNumberInput.value);
		const limit = parseInt(limitInput.value);

		errorMessage.textContent = '';

		if (!isValidNumber(pageNumber) && !isValidNumber(limit)) {
			errorMessage.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
		} else if (!isValidNumber(pageNumber)) {
			errorMessage.textContent = 'Номер страницы вне диапазона от 1 до 10';
		} else if (!isValidNumber(limit)) {
			errorMessage.textContent = 'Лимит вне диапазона от 1 до 10';
		} else {
			const url = `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`;

			fetch(url)
				.then(response => response.json())
				.then(data => {
					// Сохраняем данные в localStorage
					localStorage.setItem('lastPhotos', JSON.stringify(data));
					displayPhotos(data);
				})
				.catch(error => {
					console.error('Error fetching photos:', error);
				});
		}
	});

	// Отображение фотографий
	function displayPhotos(photos) {
		photoList.innerHTML = '';
		photos.forEach(photo => {
			const img = document.createElement('img');
			img.src = photo.thumbnailUrl;
			img.alt = photo.title;
			photoList.appendChild(img);
		});
	}

	// Проверка localStorage при загрузке страницы
	const lastPhotos = JSON.parse(localStorage.getItem('lastPhotos'));
	if (lastPhotos) {
		displayPhotos(lastPhotos);
	}
});

