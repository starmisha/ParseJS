<!DOCTYPE html>
<html lang="ru">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Запрос картинок</title>
	<link rel="stylesheet" href="5.css">
	<script src="5.js"></script>
</head>

<body>
	<div class="container">
		<h1>Photo Request App</h1>
		<div class="input-group">
			<label for="pageNumber">Номер страницы:</label>
			<input type="number" id="pageNumber" min="1" max="10">
		</div>
		<div class="input-group">
			<label for="limit">Лимит:</label>
			<input type="number" id="limit" min="1" max="10">
		</div>
		<button id="requestButton">Запрос</button>
		<div id="errorMessage"></div>
		<div id="photoList"></div>
	</div>

</body>

</html>
