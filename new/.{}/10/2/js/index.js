function visitLink(path) {
	if (localStorage.length === 0) {
		localStorage.setItem('Page1', 0);
		localStorage.setItem('Page2', 0);
		localStorage.setItem('Page3', 0);
	}

	if (path === 'Page1') {
		let p1Counter = parseInt(localStorage.getItem('Page1'));
		p1Counter++;
		localStorage.setItem('Page1', p1Counter);
	} else if (path === 'Page2') {
		let p2Counter = parseInt(localStorage.getItem('Page2'));
		p2Counter++;
		localStorage.setItem('Page2', p2Counter);
	} else if (path === 'Page3') {
		let p3Counter = parseInt(localStorage.getItem('Page3'));
		p3Counter++;
		localStorage.setItem('Page3', p3Counter);
	}
}

function viewResults() {
	const container = document.querySelector('#content');
	let ul = document.createElement('ul');
	for (let i = 0; i < localStorage.length; i++) {
		let li = document.createElement('li');
		const key = localStorage.key(i);
		li.innerText = `You visited ${key} ${localStorage.getItem(key)} time(s)`;
		ul.appendChild(li);
		console.log(localStorage.getItem(key));
	}
	container.appendChild(ul);
	localStorage.clear();
}