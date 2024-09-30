/ Исходный JSON
const inputJson = {
	"list": [
		{
			"name": "Petr",
			"age": "20",
			"prof": "mechanic"
		},
		{
			"name": "Vova",
			"age": "60",
			"prof": "pilot"
		}
	]
};

// Преобразование JSON в нужный формат
const transformedJson = {
	list: inputJson.list.map(student => ({
		name: student.name,
		age: parseInt(student.age, 10),
		prof: student.prof
	}))
};

console.log(JSON.stringify(transformedJson, null, 2));
