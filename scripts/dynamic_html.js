window.onload = init;

const fileName = 'includes/all_html.txt';

function init() {
  readData(fileName);
}

function scrollTo(id) {
  const element = document.getElementById(id);
  if (!!element) {
    element.scrollIntoView();
  } else {
    console.log(`cant find element "${id}"  to scroll`);
  }
}

function displayData(data) {
  const navBar = document.getElementById('navbar');
  const docContent = document.getElementById('main-doc-content');
  const ul = document.createElement('ul');
  navBar.appendChild(ul);

  for (let element of data) {
    const name = element[0];
    const description = element[1];
    const html5 = element[2];
    const samples = [];
    for (let i = 3; i < element.length; i++) {
      samples.push(element[i]);
    }
    const li = document.createElement('li');
    li.addEventListener('click', () => scrollTo(name));
    const html = `<a href="#${name}">&lt;${name}&gt;</a>`;
    li.innerHTML = html;
    ul.appendChild(li);

    const section = document.createElement('section');
    section.id = name;
    section.innerHTML = `<header><h3>${name}</h3></header>
<p>${description} ${!!html5 ? html5 : ''}</p>`;
    if (!!samples && samples.length > 0) {
      const samplesText = samples.join('\n');
      if (samplesText.length > 0) {
        section.innerHTML += `<div class="sample">${samplesText}</div>`;
      }
    }
    section.innerHTML += `<a href="#top">Top of Page</a>`;

    docContent.appendChild(section);
  }
}

function readData(fileName) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = processData(this.responseText);
      displayData(data);
    }
  }
  request.open('GET', fileName);
  request.send();
}

function processData(fileContent) {
  const result = [];
  const lines = fileContent.split("\n");
  let lineObject = null;
  for (let line of lines) {
    if (!!line && line[0] !== ' ' && line !== '\r') {
      if (!!lineObject) {
        result.push(lineObject);
      }
      lineObject = [];
    }
    lineObject.push(line);
  }

  if (!!lineObject) {
    result.push(lineObject);
  }

  return result;
}
