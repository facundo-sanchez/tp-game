let animation = null
let menuAudio = new Audio();
const btnPlay = document.getElementById('play')
const btnGuide = document.getElementById('guide');
const btnGuideOk = document.getElementById('btn-guideOk');

const personaje = new Personaje();
const game = new Games(personaje);

document.getElementById('personaje').classList.add('d-none')

window.addEventListener('DOMContentLoaded', async () => {
  btnGuide.addEventListener('click', () => {
    document.querySelector('.menu').classList.add('d-none');
    document.querySelector('.guide').classList.remove('d-none');
  })

  btnGuideOk.addEventListener('click', () => {
    document.querySelector('.guide').classList.add('d-none');
    document.querySelector('.menu').classList.remove('d-none');
  })

  btnPlay.addEventListener('click', () => {
    personaje.clear();
    document.querySelector('.menu').classList.add('d-none')
    document.getElementById('personaje').classList.remove('d-none')
    playAudio();
    game.start();
    animation = requestAnimationFrame(gameLoop);
  })
})

/* Esta funcion se va llamar recursivamente y va verificar el estado del juego.
  la condicion de corte va ser si el game.getGame es falso. si es falso es porque el usuario
  perdio en el juego
  Esta funcion va verificar la colision y la eliminacion de elementos del body
*/
function gameLoop() {
  if (game.getGame()) {
    game.deleteElements();
    game.checkCollision();
    animation = requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(animation);
  }
}

const playAudio = () => {
  menuAudio.currentTime = 0;
  menuAudio.src = '../audio/menu.mp3'
  menuAudio.volume = .5;
  menuAudio.play();
}