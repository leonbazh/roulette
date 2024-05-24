const cells = 101

// From 0.001 to 100
const items = [
  {name: '10000', img: 'IMG/case/10000.png', chance: 2},
  {name: '5000', img: 'IMG/case/5000.png', chance: 4},
  {name: '1000', img: 'IMG/case/1000.png', chance: 0.4},
  {name: '500', img: 'IMG/case/500.png', chance: 0.5},
  {name: '100', img: 'IMG/case/100.png', chance: 0.8},
  {name: 'Energy', img: 'IMG/case/energy.png', chance: 3},
  {name: 'Suhari', img: 'IMG/case/suhari.png', chance: 6},
  {name: 'Snickers', img: 'IMG/case/snickers.png', chance: 5},
  {name: 'Orbit', img: 'IMG/case/orbit.png', chance: 6},
  {name: 'Nothing', img: 'IMG/case/nothing.png', chance: 90}
]

function getItem(excludeHighValue = false) {
  let item;
  let totalChance = items.reduce((sum, elm) => sum + elm.chance, 0);

  while (!item) {
    const chance = Math.random() * totalChance;

    let currentSum = 0;
    for (const elm of items) {
      if (excludeHighValue && (elm.name === '10000' || elm.name === '5000')) continue;
      currentSum += elm.chance;
      if (chance < currentSum) {
        item = elm;
        break;
      }
    }
  }

  return item;
}

function generateItems() {
  document.querySelector('.list').remove()
  document.querySelector('.scope').innerHTML = `
    <ul class="list"></ul>
  `
  
  const list = document.querySelector('.list')

  for (let i = 0; i < cells; i++) {
    const item = getItem(i === 50);
    
    const li = document.createElement('li')
    li.setAttribute('data-item', JSON.stringify(item))
    li.classList.add('list__item')
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
    `

    list.append(li)
  }
}

generateItems()

let isStarted = false
let isFirstStart = true

function start() {
  if (isStarted) return
  else isStarted = true

  if (!isFirstStart) generateItems()
  else isFirstStart = false
  const list = document.querySelector('.list')
  setTimeout(() => {
    list.style.left = '50%'
    list.style.transform = 'translate3d(-50%, 0, 0)'
  }, 0)

  const item = list.querySelectorAll('li')[50]

  list.addEventListener('transitionend', () => {
    isStarted = false
    item.classList.add('active')

    const data = JSON.parse(item.getAttribute('data-item'))
    
    console.log(data);
  }, {once: true})
}

function playOpeningSong() {
  var openingAudio = document.getElementById("openingAudio");
  openingAudio.play();
  openingAudio.addEventListener("ended", playEndingSong);
}


function playEndingSong(){
  var endAudio = document.getElementById("endingAudio");
  endAudio.play();
}

function startandplay(){
  start();
  playOpeningSong();
  runScript();
}

function runScript() {
  // Создаем новый экземпляр объекта XMLHttpRequest
  var xhr = new XMLHttpRequest();
  
  // Устанавливаем URL нашего серверного скрипта, который выполнит .js файл
  var url = 'http://localhost:3000/run-script';
  
  // Отправляем GET-запрос на сервер для выполнения .js файла
  xhr.open('GET', url, true);
  xhr.send();
  
  // Обработчик события загрузки ответа от сервера
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Скрипт успешно запущен');
    } else {
      console.error('Ошибка при запуске скрипта');
    }
  };
}
