function transformXmlToJson(xmlString) {
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlString, "text/xml");

	const students = xmlDoc.querySelectorAll("student");
	const list = [];

	students.forEach(student => {
		const name = student.querySelector("name");
		const first = name.querySelector("first").textContent;
		const second = name.querySelector("second").textContent;
		const age = parseInt(student.querySelector("age").textContent, 10);
		const prof = student.querySelector("prof").textContent;
		const lang = name.getAttribute("lang");

		list.push({
			name: `${first} ${second}`,
			age: age,
			prof: prof,
			lang: lang
		});
	});

	return { list };
}



const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const result = transformXmlToJson(xmlString);
console.log(result);
